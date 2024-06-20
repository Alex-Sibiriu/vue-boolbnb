<script>
import axios from 'axios';
import {store} from '../data/store.js';
import Castles from '../components/partials/partialsCastles/Castles.vue';
import  Offcanvas  from '../components/partials/partialsCastles/OffCanvas.vue';

  export default {
    name: 'Houses',

    components:{
      Castles,
      Offcanvas,
    
    },

    data(){
      return{
        store,
      }
    },

    methods:{
      getApi(){
       
      }
    },

    mounted(){
      this.getApi();
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
  

    <Castles />
    

  </div>

</template>


<style lang="scss" scoped>
.container{
  height: 100vh;
}

</style>