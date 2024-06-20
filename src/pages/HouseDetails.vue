<script>
  import axios from 'axios';
  import {store} from '../data/store';
  import Loader from '../components/partials/Loader.vue';

  import { ref } from 'vue';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/free-mode';
  import 'swiper/css/navigation';
  import 'swiper/css/thumbs';



  // import required modules
  import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

  export default {
    name: 'HouseDetail',
    components: {
      Loader,
      Swiper,
      SwiperSlide,
    },
    data(){
      return{
        store,
        axios,
        house: {},
        loading: true,
      }
    },

    setup() {
      const thumbsSwiper = ref(null);

      const setThumbsSwiper = (swiper) => {
        thumbsSwiper.value = swiper;
      };

      return {
        thumbsSwiper,
        setThumbsSwiper,
        modules: [FreeMode, Navigation, Thumbs],
      };
    },

    methods:{
      getApi(){
        this.loading = true;
        const slug = this.$route.params.slug;
        axios.get(store.apiUrl + 'house-detail/' + slug)
            .then(result =>{
              this.loading = false;
              this.house = result.data;
              console.log(result.data);

            })
            .catch(errors =>{
              this.loading = false;
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
<div class="container" v-if="loading == false">
  <div>
    
    <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :loop="true"
    :spaceBetween="10"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
    class="mySwiper2"
  >
  <swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
    ><swiper-slide
      ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
    /></swiper-slide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :loop="true"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
    ><swiper-slide
      ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
    /></swiper-slide>
  </swiper>

    <h2 class="text-center">{{ house.title }}</h2>
  </div>

  <div>
    
   
      <p>
        <strong>Indirizzo:</strong>
        {{ house.address }}
      </p>

      <div class="d-flex">

        <p class="me-3">
          <strong>Numero stanze:</strong>
          {{ house.rooms }}
        </p>

        <p class="me-3">
          <strong><i class="fa-solid fa-bath"></i> Numero bagni:</strong>
          {{ house.bathrooms }}
        </p>

        <p>
          <strong><i class="fa-solid fa-bed"></i> Posti letto:</strong>
          {{ house.bed }}
        </p>
      </div>

      <div class="mb-3">

        <div>

          <strong>Descrizione:</strong>
        </div>
        {{ house.description }}

      </div>




    <p>
      <strong>Metri quadri:</strong>
      {{ house.square_meters }}
    </p>

    <p>
      <strong>Proprietario:</strong>
      {{ house.user.name }}
    </p>
   
  </div>

</div>

<Loader v-else />
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as * ;
.container{
  min-height: calc(100vh - 300px);
  position: relative;

  h2{
    position: absolute;
    top: 520px;
    left: 0;
    z-index: 100;
    padding: 10px 20px;
    text-shadow: 5px 5px 5px $dark-color;
    font-weight: bold;
    font-size: 3rem;
    color: $light-color;
  }

  // css swiper
  .mySwiper2{
    height: 600px !important;
  }
  
  .mySwiper{
    height: 200px !important;
  }
  

  .swiper {
  width: 100%;

}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

body {
  background: #000;
  color: #000;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

}
</style>