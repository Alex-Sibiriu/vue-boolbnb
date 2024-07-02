<script>
import axios from 'axios';
import {store} from '../../../data/store.js';

  export default {
    data(){
      return{
        store,
      }
    },

    methods:{

      hasValidSponsor(castle) {
        const currentDate = new Date();
        if (!castle.sponsors || castle.sponsors.length === 0) {
          return false;
        }
        console.log(currentDate);
        return castle.sponsors.some(sponsor => new Date(sponsor.pivot.expiration_date) > currentDate);
      },
   
    },

    mounted(){
      
    }
  }
</script>
<template>

  <h2 v-if="store.serviceName != '' ">Castelli con {{ store.serviceName }}</h2>
  <div class="row  pb-5 row-cols-1 row-cols-md-2 row-cols-lg-3 ">
    <div class="col mb-5 px-4 " v-for="castle in store.houses" :key="castle.id" >

      <router-link :to="{name: 'houseDetails', params:{slug: castle.slug}}" >
        <div class="castle position-relative">
          
          <div class="diagonal badge color" v-if="hasValidSponsor(castle)">
            <i class="fa-solid fa-star"></i>
            sponsorizzato
            <i class="fa-solid fa-star"></i>
          </div>

          <div class="d-flex justify-content-center align-items-center">

            <img :src="`http://127.0.0.1:8000/storage/${castle.images[0].image_path}`" alt="">
          </div>
          <h5 class="text-capitalize ps-2 py-1">{{ castle.title }}</h5>

        </div>
      </router-link>

    </div>
  </div>

</template>


<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';

h2 {
  color: $brand-color;
  font-weight: bold;
  padding: 0 20px 20px;
}

.row:last-child{
  // per allineare l'ultima card
  justify-content: start !important;
}
.castle{
  background-color: $dark-color;
  color: $light-color;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border: 3px solid $dark-color;

  &:hover{

    scale: 1.1;
    transition: .4s;
  }

  img{
    width: 100%;
    object-fit: cover;
    height: 250px;
  }

  .icons{
    position: absolute;
    right: 2px;
    top: 2px;

    ul{
      list-style: none;
      padding: 0;
      margin: 0;
     li{
      color: $brand-color;
     }
    }
  }

  h5{
    // background-color: $light-color;
    // color: $dark-color;
    color: $light-color;
    margin-top: 5px;
    padding-left: 3px;
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