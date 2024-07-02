<script>
  import _ from 'lodash';

  import {store} from '../../../data/store.js';
  import axios from 'axios';

  export default {
    name: 'Navbar',
    components: {
      
    },
    setup() {
      return {
        
      };
    },

    data() {
      return {
        store,
        suggestions: [],
        selectedAddress: false
      }
    },

    methods: {
      getSuggestions: _.debounce(function() {
      if (store.inputAddress.length > 1) {
        axios.get(`https://api.tomtom.com/search/2/search/${store.inputAddress}.json`, {
            params: {
              key: 'sOhLhoDd5uQFkArKiM1liP4BtoqFAxAk',
              typeahead: true,
              language: 'it-IT',
              countrySet: 'IT',
              limit: 10
            }
          })
          .then(response => {
            this.suggestions = response.data.results.map(suggestion => suggestion.address.freeformAddress);
          })
          .catch(error => {
            console.error('Errore nella ricerca degli indirizzi suggeriti: ', error);
          });
      } else {
        this.suggestions = [];
      }
    }, 300),

    selectSuggestion(suggestion) {
      store.inputAddress = suggestion;
      this.selectedAddress = true;
      this.suggestions = [];
    },

    submitForm() {
      if (this.selectedAddress) {
        this.suggestions = [];
        this.$router.push({ name: 'houses' });
      } else {
        alert('Per favore seleziona un indirizzo valido dai suggerimenti.');
      }
    },

    handleCastles(event) {
      const input = this.$el.querySelector('input');
      const suggestionsBox = this.$el.querySelector('.suggestions');
      
      if (
        
        !this.$el.contains(event.target) &&
        !input.contains(event.target) &&
        !suggestionsBox.contains(event.target)
      ) {
        this.suggestions = [];
      }
    },

    getFilteredCastles() {
        this.loading = true
        store.serviceName = '';
        
        axios.get(store.apiUrl + 'houses/search', {
          params: {
            address: encodeURIComponent(store.inputAddress),
            range: store.searchRange,
            rooms: store.searchRooms,
            beds: store.searchBeds,
            bathrooms: store.searchBath,
            services: store.searchServices
          }
        })
        .then(response => {
          store.houses = response.data;
          this.loading = false
        })
        .catch(error => {
          console.error('Errore nella ricerca dei castelli ', error);
          this.loading = false
        })
      }
    },

    mounted() {
      document.addEventListener('click', this.handleCastles);
    },

    beforeDestroy() {
      document.removeEventListener('click', this.handleCastles);
    },
  };
</script>

<template>
  <div class="position-relative" >
    

    
    <div class="searchbar w-75">
      <form class="form-inline" @submit.prevent="getFilteredCastles">

        <div class="position-relative">
          <div class="d-flex">
            <input class="form-control rounded-end-0 rounded-bottom-0 w-100" type="text" placeholder="Ricerca per luogo"
              aria-label="Search" v-model="store.inputAddress" @keyup="selectedAddress = false, getSuggestions()">
              <div class="btn-box">
                <button class="rounded-end-3 rounded-bottom-0 px-2" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
          </div>
            <div class="suggestions position-absolute w-100 rounded-bottom-2 overflow-hidden">
              <p
                v-for="(suggestion, index) in suggestions"
                :key="`sug-${index}`"
                @click.stop="selectSuggestion(suggestion)"
                class="bg-white p-1 ps-2 m-0 border-bottom border-secondary-subtle d-flex">
                <span class="icons text-secondary">
                  <i class="fa-solid fa-location-dot me-2"></i>
                </span>
                {{ suggestion }}
              </p>
            </div>
        </div>
      </form>
    </div>

  </div>



</template>

<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';

.searchbar {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  input:focus, select:focus {
  outline: none;
  box-shadow: none;
  border-color: transparent;
}
  h2{
    color: #eaeaea;
    margin-bottom: 30px;
  }
  button[type='submit']{
    background: white;
    color: rgb(5, 28, 44) ;
    align-content: center;
    border: none;
    width: 100%;
    height: 100%;
  }
  .suggestions {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    z-index: 999;
    .icons {
      display: inline-block;
      width: fit-content;
    }
  }
}




@media screen and (max-width: 768px) {
  .searchbar {
    width: 90% !important;
  }
}
</style>
