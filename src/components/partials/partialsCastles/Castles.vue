<script>
import axios from 'axios';
import {store} from '../../../data/store.js';
import Loader from '../../partials/Loader.vue';
  export default {
    name: 'Castles',

    components:{
      Loader,
    },

    data(){
      return{
        store,
      }
    },

    methods:{
      getApi(){
        axios.get(store.apiUrl + 'houses')
        .then(result =>{
          store.houses = result.data.data;
          console.log(store.houses);
        })

        .catch(error =>{
          console.log(error);
        })
      }
    },

    mounted(){
      this.getApi();
    }
  }
</script>
<template>

  <div class="row row-cols-4" v-if="!loading">

    <div class="col mb-5" v-for="castle in store.houses" :key="castle">

      <div class="castle" >
        <img src="https://siviaggia.it/wp-content/uploads/sites/2/2021/09/Castello-di-Neuschwanstein.jpg" alt="">
        <h4>{{ castle.title }}</h4>
        <p>{{ castle.address }}</p>

      </div>

    </div>
    

  </div>

  <Loader v-else />

</template>


<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';

.castle{
  width: 300px;
  img{
    width: 100%;
    object-fit: cover;
  }
}


</style>