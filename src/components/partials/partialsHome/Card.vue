<script>
import {store} from '../../../data/store.js';
import axios from 'axios';
import Loader from '../../partials/Loader.vue';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

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
        houses: [],
        
      }
    },

    setup() {
      return {
        modules: [Navigation],
      };
    },

    methods:{
     
      getApi(){
        
        this.loading = true;
        axios.get(store.apiUrl + 'houses')
        .then(result =>{
          this.loading = false;
          this.houses = result.data;
         

          this.getSponsored();
       
        })
        .catch(error =>{
          this.loading = false;
          console.log(error);
        })
      },

      // funzione per estrapolare solo i castelli con lo sponsor
      getSponsored(){
        this.housesFiltered = [];

        let date = new Date();
     
        this.houses.forEach(house => {

          if(!house.sponsors || house.sponsors.length === 0){
           
          return;

        }else if(house.sponsors.some(sponsor => new Date(sponsor.pivot.expiration_date) > date)){

          this.housesFiltered.push(house);
         
        }
        });
        
      },
    },

    mounted(){
      this.getApi();
    },
  }
</script>
    
<template>
  <div class="my-5 py-5">

    <h3 class="text-center my-5 fw-bold">Castelli in primo piano</h3>

    <div v-if="!loading" class="">

      
      <swiper
      :navigation="true"
      :slidesPerView="1"
      :centeredSlides="true"
      :spaceBetween="30"
      :grabCursor="true"
      :initialSlide="1"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper"
      :breakpoints="{
      680: {
        slidesPerView: 1
      },
      950: {
        slidesPerView: 1
      },
      1150: {
        slidesPerView: 2
      },
      1650: {
        slidesPerView: 3
      }
    }"
    >
      <swiper-slide class="p-3 my-3" v-for="house in housesFiltered" :key="house.id">

        <router-link :to="{name: 'houseDetails', params:{slug: house.slug}}" class="d-inline-block">

          <div class="castle ">
    
            <div class="bg-castle">

              <div class="diagonal badge color">
                <i class="fa-solid fa-star"></i>
                sponsorizzato
                <i class="fa-solid fa-star"></i>
                
              </div>
              <img v-if="!house.images || !house.images[0] || !house.images[0].image_path" src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="">
              <img v-else :src="`https://laravel-boolbnb-production.up.railway.app//storage/${house.images[0].image_path}`" alt="">
    
          
              <router-link :to="{name: 'houseDetails', params:{slug : house.slug}}"><h4 class=" text-capitalize">{{ house.title }}</h4></router-link>
            </div>
    
          </div>
        </router-link>

      </swiper-slide>
      
    </swiper>

    </div>

    
    <Loader v-else />
  </div>


</template>

<style lang="scss" scoped>
@import '../../../assets/scss/partials/variables.scss';

h3{
  color: $dark-color;
}

.castle{
  padding: 0;
  overflow: hidden;
  border-radius: 10px;
  
  .bg-castle{
    position: relative;
    overflow: hidden;
    height: 100%;
    padding: 0;
   
    
    img{
      border-radius: 10px;
      overflow: hidden;
      max-width: 550px;
      object-fit: contain;
      height: 100%;

    
    }

    a{
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 5px 10px 0 10px;
      border-radius: 25px 0 0 0;
      text-decoration: none;
      color: $light-color;
    
      box-shadow: $dark-color 0px 30px 60px -12px inset, $dark-color 0px 18px 36px -18px inset;
 

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
.swiper {
  height: 100%;
  
}

.swiper-slide {
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 500px) {
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .castle{
    height: 190px;
    
  }
}


</style>