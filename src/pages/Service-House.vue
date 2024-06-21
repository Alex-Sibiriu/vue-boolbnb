  <script>
  import { store } from '../data/store.js';
  import axios from 'axios';
  import Castles from '../components/partials/partialsCastles/Castles.vue';
  export default {
      name: 'houseService',
      components:{
        Castles
      },
      data(){
        return{
          store
        }
      },
      methods:{
        getApi(slug){
          axios.get(store.apiUrl + 'house-service/' + slug)
                .then(result =>{
                  console.log(result.data);
                  store.serviceName = result.data.name;
                  store.houses = result.data.houses;
                })
                .catch(error =>{
                  console.log(error.message);
                })
        }
      },
      mounted(){
        this.getApi(this.$route.params.slug)
      }
  }
</script>

<template>
    <div class="container">
      <div class="row my-5">
        <div class="col">
          <h1> Castelli con {{ store.serviceName }}</h1>
        </div>
      </div>

      <Castles/>
    </div>
</template>

<style lang="scss" scoped>
  @use '../assets/scss/main.scss' as *;

  h1{
    color: $brand-color;
    font-weight: bold;
  }
</style>