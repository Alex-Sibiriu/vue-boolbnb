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

  <div class="row  pb-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center">
    <div class="col mb-5 px-4 justify-content-center d-flex" v-for="castle in store.houses" :key="castle">

      <router-link :to="{name: 'houseDetails', params:{slug: castle.slug}}" >

        <div class="castle h-100 rounded-2" >
          <img src="https://siviaggia.it/wp-content/uploads/sites/2/2021/09/Castello-di-Neuschwanstein.jpg" alt="">
          <h4 class="p-2">{{ castle.title }}</h4>
          <p class="ps-2">{{ castle.address }}</p>
        </div>
      </router-link>

    </div>
  </div>

</template>


<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';

.castle{

  overflow: hidden;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.7);
  img{
    width: 100%;
    object-fit: cover;
  }
}
a{
  text-decoration: none;
  color: $dark-color;
}


</style>