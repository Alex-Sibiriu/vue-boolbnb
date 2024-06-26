<script>

import Card from '../components/partials/partialsHome/Card.vue';
import Services from '../components/partials/partialsHome/Services.vue';
import {store} from '../data/store';


   export default {
    name: 'Home',

    data(){
      return{
        store,
        
      }
    },


    components:{
      Card,
      Services,

    },

    mounted(){
      this.store.inputAddress = '';
      this.store.searchServices = [];
    }
     
  }
</script>
    
<template>


  <div class="container-fluid my-3 p-0">
    
    <Card />

    <div class="banner d-flex justify-content-center align-items-center">

      <div class=" container row row-cols-1 row-cols-lg-2 align-items-center">

        <div class="col-12 col-lg-7 ">

          <p class="m-0">
            <span>

              <i class="fa-solid fa-quote-left"></i> 
            </span>
            Siamo un team di professionisti leader nel settore con una grande passione per il nostro lavoro.
            <br>
            Offriamo molti servizi esclusivi ed unici per una clientela d'elite.
            <br>
            Ci impegnamo ogni giorno per rendere l'esperienza dei nostri clienti una favola realizzabile, come i sogni che hanno sempre desiderato da una vita.
            <span>

               <i class="fa-solid fa-quote-right"></i>
            </span>
          </p>
    
        </div>
        <div class="col-12 col-lg-5">
  
          <img src="/img/favicon.png" alt="logo" class="w-75" >
        </div>
        
      </div>

    </div>

    <Services />

  </div>


</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as * ;



.banner {
  width: 100%;
  padding: 200px 0;
  background-color: $dark-color;
  color: $light-color;
  font-size: 2rem;
  font-family: "Lobster", sans-serif;
  
  img{
    object-fit: cover;
    width: 500px;
  }

  .row{

    .m-0{

      line-height: 2.5rem;
      span{
        font-size: 2.5rem;
      }
    }
  }
}



</style>