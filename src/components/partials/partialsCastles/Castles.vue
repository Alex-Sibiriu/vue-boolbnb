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
    <div class="col mb-5 px-4 justify-content-center d-flex" v-for="castle in store.houses" :key="castle.id">

      <router-link :to="{name: 'houseDetails', params:{slug: castle.slug}}">
        <div class="castle h-100 rounded-2 position-relative">
          
          <div class="diagonal badge color" v-if="castle.sponsors.length > 0">
            <i class="fa-solid fa-star"></i>
            sponsorizzato
            <i class="fa-solid fa-star"></i>
          </div>

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

.row:last-child{
  // per allineare l'ultima card
  justify-content: start !important;
}
.castle{
  background-color: $dark-color;
  color: $light-color;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  img{
    width: 100%;
    object-fit: cover;
  }
}
a{
  text-decoration: none;
  color: $dark-color;
}

.diagonal{
		white-space:nowrap;
		position: absolute;
		padding: 5px 0px;
		min-width: 300px;
		transform: rotate(-45deg) translate(-44%, 0);
    background-color: $brand-color;
		color: white;
		text-align: center;
		text-transform: uppercase;
		font-size: 12px;
		top: -50px;
		box-sizing: border-box;
		}

</style>