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

  <div v-if="!loading" class="">

    
    <swiper
    :slidesPerView="1"
    :centeredSlides="true"
    :spaceBetween="30"
    :grabCursor="true"
    :initialSlide="2"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
    :breakpoints="{
    680: {
      slidesPerView: 2
    },
    950: {
      slidesPerView: 3
    }
  }"
  >
    <swiper-slide class="p-3" v-for="house in housesFiltered" :key="house.id">

      <router-link :to="{name: 'houseDetails', params:{slug: house.slug}}" class="d-inline-block">

        <div class="castle">
  
          <div class="bg-castle">
  
            <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="">
  
            <router-link :to="{name: 'houseDetails', params:{slug : house.slug}}"><h4>{{ house.title }}</h4></router-link>
          </div>
  
        </div>
      </router-link>

    </swiper-slide>
    
  </swiper>

  </div>

  
  <Loader v-else />


</template>

<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';


.castle{
  padding: 0;
  overflow: hidden;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  
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


@media screen and (max-width: 768px) {
  .mySwiper{
    slidesPerView: 2;
  }
}

</style>