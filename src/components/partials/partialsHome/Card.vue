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
        houses: []
      }
    },

    methods:{
     
      getApi(){
        
        this.loading = true;
        axios.get(store.apiUrl + 'houses')
        .then(result =>{
          this.loading = false;
          this.houses = result.data.data;
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
        this.housesFiltered = this.houses.filter(house=> house.sponsors.length > 0)
        console.log(this.housesFiltered);
      },
    },

    mounted(){
      this.getApi();
    },
  }
</script>
    
<template>

  <h3 class="text-center my-3">Castelli sponsorizzati</h3>

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

        <div class="castle ">
  
          <div class="bg-castle">

            <div class="diagonal badge color">
              <i class="fa-solid fa-star"></i>
              sponsorizzato
              <i class="fa-solid fa-star"></i>
              
            </div>
  
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

    .badge {
	
		&.color{
			background: $brand-color;	
		}
		
		&.diagonal{
		white-space:nowrap;
		position: absolute;
		padding: 5px 100px;
		min-width: 300px;
		transform: rotate(-45deg) translate(-37%, 0);
		color: white;
		text-align: center;
		text-transform: uppercase;
		font-size: 12px;
		top: -20px;
		box-sizing: border-box;
		}
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