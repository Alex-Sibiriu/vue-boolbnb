<script>
  import axios from 'axios';
  import {store} from '../data/store';
  import Loader from '../components/partials/Loader.vue';
  import Map from '../components/partials/Map.vue';
  import '@tomtom-international/web-sdk-maps/dist/maps.css';

  // serve per la mappa di alex?
  // import { ref } from 'vue'; 

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // import required modules
  import { Pagination } from 'swiper/modules';

  export default {
    name: 'HouseDetail',
    components: {
      Loader,
      Map,
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

        resultMessage: '',

        apiKey: 'sOhLhoDd5uQFkArKiM1liP4BtoqFAxAk',
        longitude: null,
        latitude: null,

        allCastles: [],
      }
    },
    setup() {
      return {
        modules: [Pagination],
      };
    },

    methods:{
      getAllCastles(){
        this.loading = true;
        axios.get(store.apiUrl + 'houses')
        .then(result =>{
          this.allCastles = result.data;
          this.loading = false;
          console.log(this.allCastles);
        })
        .catch(error =>{
          this.loading = false;
          console.log(error);
        })
      },

      getApi() {
        this.loading = true;
        const slug = this.$route.params.slug;

        axios.get(store.apiUrl + 'house-detail/' + slug)
        .then(result =>{
          this.loading = true;
          this.house = result.data;
          // console.log(this.house);
          this.longitude = parseFloat(result.data.longitude);
          this.latitude = parseFloat(result.data.latitude) ;

          this.getAllCastles();
        })
        .catch(errors => {
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
      },
    },

    mounted(){
      // this.getAllCastles();
      this.getApi();
    }
  
  }
</script>
    
<template>
  <div class="container" v-if="loading == false">
    <h1 class="my-5">{{ house.title }}</h1>
    <div class="container-swiper">

      <swiper :loop="true" 
    :pagination="{
      dynamicBullets: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="image in house.images" :key="image.id">
      <img :src="`http://127.0.0.1:8000/storage/${image.image_path}`" alt=""> 
    </swiper-slide>
    
  </swiper>

      
    </div>

    <div class="row pb-5 mt-5">
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
          <p v-if="house.user.name">
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

      <div class="col-12 pt-5">
        <h4>Dove Sarai</h4>
        <Map :apiKey="apiKey" :lat="latitude" :long="longitude" :houses="allCastles"></Map>
      </div>
    </div>

  </div>

  <div class="loader" v-else>
    <Loader />
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as * ;

#map {
  width: 100%;
  height: 500px;
}

.loader {
  height: calc(100vh - 300px);
  display: flex;
  align-content: center;
  justify-content: center;
}

.container{
  min-height: calc(100vh - 350px);
  position: relative;

  h1{
    color: $brand-color;
    font-size: 3rem;
    font-weight: bold;
  }

  form {
    color: white;
    background-color: $dark-color;
    border: 10px solid $brand-color;
    text-align: center;
    font-weight: bold;
  }

  // h2{
  //   position: absolute;
  //   top: 520px;
  //   left: 0;
  //   z-index: 100;
  //   padding: 10px 20px;
  //   text-shadow: 5px 5px 5px $dark-color;
  //   font-weight: bold;
  //   font-size: 3rem;
  //   color: $light-color;
  // }

  ul {
    columns: 2;
    .icons {
      width: 30px;
    }
  }

  .swiper {
    width: 100%;
    height: 20%;

    img{
      height: 700px;
      object-fit: cover;
    }
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
    object-fit: cover;
  }
}
</style>