<script>
import axios from 'axios';
import {store} from '../data/store.js';
import Castles from '../components/partials/partialsCastles/Castles.vue';
import  Offcanvas  from '../components/partials/partialsCastles/OffCanvas.vue';
import Loader from '../components/partials/Loader.vue';
import Navbar from '../components/partials/partialsHome/Navbar.vue';


  export default {
    name: 'Houses',

    components:{
      Castles,
      Offcanvas,
      Loader,
      Navbar,
    },

    data(){
      return{
        store,
        loading: true
      }
    },

    methods:{
      getApi(){
        this.loading = true
        axios.get(store.apiUrl + 'houses')
        .then(result =>{
          store.houses = result.data.data;
          console.log(store.houses);
          this.loading = false
        })
        .catch(error =>{
          console.log(error);
          this.loading = false
        })
      },

      getFilteredCastles() {
        this.loading = true
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
      this.getFilteredCastles();
      window.scrollTo(0, 0);
    }
  }
</script>
<template>
  <div class="container">
    
    <div class="row my-5">
      
      <div class="col col-8">
        <h2>Risultati di ricerca:</h2>
        
        <Navbar />
      </div>

      <div class="col col-4 pt-3 d-flex align-items-center justify-content-end">

        <button class="btn btn-primary fw-medium mt-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtri Avanzati</button>
      </div>


    </div>
  

    <Offcanvas 
      @searchCastles="getFilteredCastles()"
    />
  
    <Loader v-if="loading" />
    <Castles v-else/>

    <h3 v-if="!loading && store.houses.length === 0">Nessun castello trovato</h3>

  </div>

</template>


<style lang="scss" scoped>
.container{
  min-height: calc(100vh - 300px);
}

h3 {
  color: #9D061B;
}

</style>