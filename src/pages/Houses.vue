<script>
import axios from 'axios';
import {store} from '../data/store.js';
import Castles from '../components/partials/partialsCastles/Castles.vue';
import  Offcanvas  from '../components/partials/partialsCastles/OffCanvas.vue';
import Loader from '../components/partials/Loader.vue';

  export default {
    name: 'Houses',

    components:{
      Castles,
      Offcanvas,
      Loader
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
        if (store.inputAddress != '') {
          axios.get(store.apiUrl + 'houses/search/' + store.inputAddress + '/300')
            .then(response => {
              store.houses = response.data;
              this.loading = false
            })
            .catch(error => {
              console.error('Errore nella ricerca dei castelli vicini: ', error);
              this.loading = false
            })
        } else {
          this.getApi();
        }
      }
    },

    mounted() {
      this.getFilteredCastles();
    }
  }
</script>
<template>

  <div class="container">

    <div class="row my-5">

      <div class="col col-10">

        <h2>Risultati di ricerca:</h2>
      </div>

      <div class="col col-2 d-flex align-items-center justify-content-end">

        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtri</button>
      </div>


    </div>
  

    <Offcanvas />
  
    <Loader v-if="loading" />
    <Castles v-else/>
    

  </div>

</template>


<style lang="scss" scoped>
.container{
  min-height: calc(100vh - 300px);
}

</style>