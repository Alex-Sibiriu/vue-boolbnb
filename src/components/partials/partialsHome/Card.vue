<script>
import {store} from '../../../data/store.js';
import axios from 'axios';
import Loader from '../../partials/Loader.vue';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';


  // import required modules
  import { Pagination } from 'swiper/modules';

   export default {
    name: 'Card',

    components: {
      Loader,
      Swiper,
      SwiperSlide,
    
    },

    data(){
      return{
        store,
        loading: true,
        housesFiltered: [],
 

      }
    },

    setup() {
      return {
        // modules: [Pagination],
      };
    },

    methods:{
     
      getApi(apiUrl){
        
        this.loading = true;
        axios.get(store.apiUrl + 'houses')
        .then(result =>{
          this.loading = false;
          store.houses = result.data.data;
          console.log(result.data);

          this.getSponsored();
          console.log(this.housesFiltered);
        })
        .catch(error =>{
          this.loading = false;
          console.log(error);
        })

      },

      // funzione per estrapolare solo i castelli con lo sponsor
      getSponsored(){
        this.housesFiltered = store.houses.filter(house=> house.sponsors.length > 0)
        console.log(this.housesFiltered);

      },
      
    },

    mounted(){
      this.getApi(store.apiUrl, 'houses');
      
    },

    
     
  }
</script>
    
<template>

  <h2 class="text-center mb-5">Castelli sponzorizzati</h2>
  <div v-if="!loading">

    
    <swiper
    :slidesPerView="3"
    :centeredSlides="true"
    :spaceBetween="30"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="house in housesFiltered" :key="house.id">

      <div class="castle">

        <div class="bg-castle">

          <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="">

          <a href=""><h4>{{ house.title }}</h4></a>
        </div>


      </div>

    </swiper-slide>
    
  </swiper>

  </div>

  
  <Loader v-else />


</template>

<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';

h2{
  color: rgb(6, 45, 77);
}

.castle{
  padding: 0;


  
  .bg-castle{
    position: relative;

    overflow: hidden;
    
    img{
      border-radius: 10px;
      width: 100%;
      object-fit: cover;
    
    }

    a{
      position: absolute;
      left: 5px;
      bottom: 0;
      text-decoration: none;
      color: rgb(6, 45, 77);
    }

  }

  p{
    margin-left: 5px;
    color: $dark-color;
  }
  
}


// swiper
.swiper{
  height: 100%;
}

.swiper-slide {
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}




</style>