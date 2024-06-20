<script>
  import axios from 'axios';
  import {store} from '../data/store';

  export default {
    name: 'HouseDetail',
    data(){
      return{
        store,
        axios
      }
    },
    methods:{
      getApi(){
        const slug = this.$route.params.slug
        axios.get(store.apiUrl + 'house-detail/' + slug)
            .then(result =>{
              console.log(result.data)
              store.house = result.data
            })
            .catch(errors =>{
              console.log(errors.message);
            })
      }
      
    },
    mounted(){
      this.getApi();
    }
  
  }
</script>
    
<template>
<div class="container">
  <div class="row">
    <div class="col">
      <div class="card">
        <!-- stampare qui i castelli -->
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as * ;

</style>