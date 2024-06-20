<script>
  import { store } from '@/data/store';
  import axios from 'axios';
  import Loader from '../Loader.vue';
  export default {
    components:{
      Loader
    },
    data(){
      return{
        store,
        favServices : [],
        loading : true,
      }
    },
    methods:{
      getApi(){
        axios.get(store.apiUrl + 'services')
            .then(result =>{
              console.log(result.data);
              store.services = result.data 
              this.getFavServices();
            })
            .catch(errors =>{
              console.log(errors);
            })
      },
      getFavServices(){
        this.favServices = store.services.filter(service => {
          return service.name === 'Cene di Gala' || 
            service.name === 'Mostre d\'Arte' ||
            service.name === 'Spettacoli Teatrali' ||
            service.name === 'Rievocazioni Storiche' ||
            service.name === 'Concerti' ||
            service.name === 'Maneggio' 
        });
        console.log(this.favServices)
        return this.favServices
      }
    },
    mounted(){
      this.getApi();

      
    }
  }
</script>
<template>
  <div class="container my-5 p-3" v-if="loading">
    <h1 class="text-center fw-bold my-5">Services </h1>
    <div class="row">
      <div class="col">
        <ul class="columns">
          <li v-for="service in favServices" :key="service.id"><i class="icon me-5" :class="service.icon"></i> {{ service.name }}</li>
        </ul>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>


<style lang="scss" scoped>
@use '../../../assets/scss/main.scss' as * ;
.container{
  box-shadow: 5px 5px 12px 0px $shadow-color;
  h1{
    color: $brand-color;
  }
  .row{
    .col{
      .columns{
        list-style: none;
        columns: 2;
          li{
            margin-bottom: 30px;
            font-size: 1.3rem;
            font-weight: bolder;
            
            .icon{
              font-size: 2rem ;
            }
        }
      }
    }
  }
}

@media screen and (max-width:768px){
  .columns{
    columns: 1 !important;
    margin-left: 20%;
  }
}

</style>