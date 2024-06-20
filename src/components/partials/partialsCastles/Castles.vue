<script>
import axios from 'axios';
import {store} from '../../../data/store.js';

  export default {
    data(){
      return{
        store,
      }
    },
  }
</script>
<template>

  <div class="row row-cols-4 pb-5">
    <div class="col mb-5" v-for="castle in store.houses" :key="castle">

      <div class="castle h-100 rounded-2" >
        <img src="https://siviaggia.it/wp-content/uploads/sites/2/2021/09/Castello-di-Neuschwanstein.jpg" alt="">
        <h4 class="p-2">{{ castle.title }}</h4>
        <p class="ps-2">{{ castle.address }}</p>
      </div>

    </div>
  </div>

</template>


<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';

.castle{
  width: 300px;
  overflow: hidden;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.7);
  img{
    width: 100%;
    object-fit: cover;
  }
}


</style>