<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // import required modules
  import { Autoplay, Navigation } from 'swiper/modules';

  import _ from 'lodash';

  import {store} from '../../data/store';
  import axios from 'axios';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Navigation],
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
        axios.get(`https://api.tomtom.com/search/2/search/${encodeURIComponent(store.inputAddress)}.json`, {
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

    handleClickOutside(event) {
      const input = this.$el.querySelector('input');
      const suggestionsBox = this.$el.querySelector('.suggestions');
      const jumboSwiper = this.$el.querySelector('#jumbo-swiper');
      if (
        jumboSwiper.contains(event.target) ||
        !this.$el.contains(event.target) &&
        !input.contains(event.target) &&
        !suggestionsBox.contains(event.target)
      ) {
        this.suggestions = [];
      }
    },
    },

    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },

    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    },
  };
</script>

<template>
  <div class="position-relative" v-if="$route.name === 'home'">
    <swiper id="jumbo-swiper" :spaceBetween="0" :centeredSlides="true" :loop="true" :autoplay="{
      delay: 6000,
      disableOnInteraction: false,
      allowTouchMove: false, 
    }" :pagination="{
      clickable: true,
    }" :navigation="false" :modules="modules" class="mySwiper">


      <swiper-slide><img src="/img/due.jpg" alt="Image 2" /></swiper-slide>
      <swiper-slide><img src="/img/tre.webp" alt="Image 3" /></swiper-slide>
      <swiper-slide><img src="/img/quattro.webp" alt="Image 4" /></swiper-slide>
      <swiper-slide><img src="/img/cinque.jpg" alt="Image 5" /></swiper-slide>
      <swiper-slide><img src="/img/sei.webp" alt="Image 6" /></swiper-slide>
    </swiper>

    <nav
      class="position-absolute z-2 top-0 mt-3 d-flex justify-content-between align-items-center rounded-3 px-3 start-50 translate-middle-x">
      <img src="/img/castello-aborto.png" alt="aborto">
      <a href=""><i class="fa-solid fa-user"></i></a>
    </nav>

    <div class="searchbar position-absolute p-5 rounded-3 z-3 w-50">
      <form class="form-inline" @submit.prevent="submitForm">
        <h2 class="fs-4">Dove vivrai la tua prossima favola?</h2>

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
                class="bg-white p-1 ps-3 m-0 border-bottom border-secondary-subtle">{{ suggestion }}</p>
            </div>
        </div>
      </form>
    </div>

  </div>

  <header v-else>
    <nav class="d-flex align-items-center justify-content-between">
      <div class="logo">
        <img src="/img/castello-aborto.png" alt="aborto">
      </div>
      <div class="login">
        <a href=""><i class="fa-solid fa-user"></i></a>
      </div>
    </nav>
  </header>

</template>

<style lang="scss" scoped>
@use '../../assets/scss/main.scss' as *;


nav {
  height: 100px;
 
  width: 98%;

  img {
    height: 80%;
    opacity: 1; 
  }

  a {
    font-size: 1.5rem;
    color: #eaeaea;
  }
}

/* Aggiungi stile al form */
.searchbar {
  background-color: rgba(5, 28, 44, 0.699); 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.7);

  
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
    cursor: pointer;
  }
}


/* Stili Swiper */
.swiper {
  width: 100%;
  height: 100vh;
  position: relative;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


// secondo header 
header{
  height: 100px;
  background-color: $dark-color ;
  margin-bottom: 10px;
  .logo{
    img{
      width: 10%;
    }
  }
}

@media screen and (max-width: 768px) {
  .searchbar {
    width: 90% !important;
  }
}
</style>
