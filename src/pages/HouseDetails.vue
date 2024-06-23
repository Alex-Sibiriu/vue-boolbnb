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

        messageEmail: '',
        messageText: '',

        resultMessage: ''
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
      },

      sendMessage() {
        axios.post(store.apiUrl + 'send-message', {
            email: this.messageEmail,
            message: this.messageText,
            house_id: this.house.id
        })
        .then(result => {
          this.resultMessage = result.data;
          this.messageText = '';
          this.messageEmail = '';
          
          setTimeout(() => {
            this.resultMessage = '';
          }, 5000);
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

      <swiper :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }" :loop="true" :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper }" :modules="modules"
        class="mySwiper2">
        <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-10.jpg" /></swiper-slide>
      </swiper>
      <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
        :watchSlidesProgress="true" :modules="modules" class="mySwiper">
        <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide><swiper-slide><img
            src="https://swiperjs.com/demos/images/nature-10.jpg" /></swiper-slide>
      </swiper>

      <h2 class="text-center">{{ house.title }}</h2>
    </div>

    <div class="row pb-5">
      <div class="col-12 col-lg-7">
        <p class="fs-5 fw-medium pt-3">
          <strong>Indirizzo:</strong>
          {{ house.address }}
        </p>
  
        <div class="d-flex flex-wrap border-bottom border-secondary-subtle mb-3">
          <p class="me-3">
            <strong>Numero stanze:</strong>
            {{ house.rooms }}
          </p>
  
          <p class="me-3">
            <strong><i class="fa-solid fa-bath"></i> Numero bagni:</strong>
            {{ house.bathrooms }}
          </p>
  
          <p class="me-3">
            <strong><i class="fa-solid fa-bed"></i> Posti letto:</strong>
            {{ house.bed }}
          </p>

          <p>
            <strong>Metri quadri:</strong>
            {{ house.square_meters }}
          </p>
        </div>
  
        <div class="my-3 border-bottom border-secondary-subtle">
          <p>
            <strong>Proprietario:</strong>
            {{ house.user.name }} {{ house.user.surname }}
          </p>
        </div>

        <div class="border-bottom border-secondary-subtle py-3">
          <strong>Informazioni</strong>
          <p>{{ house.description }}</p>
        </div>
  

        <div class="py-3">
          <h4>Servizi Disponibili</h4>

          <ul class="list-unstyled">
            <li v-for="service in house.services" :key="service.id" class="py-2 d-flex">
              <div class="icons text-center">
                <i :class="service.icon" class="me-2"></i>
              </div>
              <div>
                <span>{{ service.name }}</span>
              </div>
            </li>
          </ul>
        </div>
  
      </div>

      <div class="col-12 col-lg-5 position-relative">
        <div class="rounded-5 pt-3 position-sticky top-0">
          <form action="" @submit.prevent="sendMessage" class=" rounded-5 p-4">

            <h3 class="pb-4">Invia un messaggio al proprietario</h3>

            <div v-if="resultMessage === '' ">
              <div class="pb-5">
                <label class="form-label" for="senderEmail">Inserisci il tuo indirizzo email</label>
                <input class="form-control" v-model="messageEmail" type="email" id="senderEmail" name="email" placeholder="Inserisci la tua mail" required>
              </div>
  
              <div class="pb-5">
                <label class="form-label" for="messageText">Inserisci il tuo messaggio</label>
                <textarea class="form-control" v-model="messageText" name="message" id="messageText" placeholder="Scrivi il tuo messaggio" rows="4" required minlength="10"></textarea>
              </div>
  
              <div class="text-center">
                <button type="submit" class="btn btn-success fw-bold">Invia il Messaggio</button>
              </div>
            </div>

            <div v-else class="bg-success rounded-3 py-4">{{ resultMessage }}</div>

          </form>

        </div>
      </div>
    </div>

  </div>

  <Loader v-else />
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as * ;


.container{
  min-height: calc(100vh - 300px);
  position: relative;

  form {
    color: white;
    background-color: $dark-color;
    border: 10px solid $brand-color;
    text-align: center;
    font-weight: bold;
  }

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

  ul {
    columns: 2;
    .icons {
      width: 30px;
    }
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