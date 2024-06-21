<script>
import axios from 'axios';
import {store} from '../../../data/store.js';


  export default {
    name: 'OffCanvas',

    components:{
      
    
    },

    data(){
      return{
        store,
        errorRooms: '',
        errorBeds: '',
        errorBath: '',
      }
    },

    methods:{
      getApi(){
        axios.get(store.apiUrl + 'services')
        .then(result =>{
          store.services = result.data;
          console.log(result.data);
        })
        .catch(error =>{
          console.log(error);
        })
      },

      validateSearch() {
        const valid = true;

        this.errorRooms = '';
        this.errorBath = '';
        this.errorBeds = '';

        if (store.searchRooms < 1 || store.searchRooms > 125) {
          this.errorRooms = 'Il numero di stanze deve essere compreso fra 1 e 125';
          valid = false;
        }

        if (store.searchBeds < 1 || store.searchBeds > 125) {
          this.errorBeds = 'Il numero di bagni deve essere compreso fra 1 e 125';
          valid = false;
        }

        if (store.searchBath < 1 || store.searchBath > 125) {
          this.errorBath = 'Il numero di bagni deve essere compreso fra 1 e 125';
          valid = false;
        }

        if (valid) {
          this.$emit('searchCastles')
        }
      },

      toggleService(serviceId) {
        const index = store.searchServices.indexOf(serviceId);
        if (index > -1) {
          store.searchServices.splice(index, 1);
        } else {
          store.searchServices.push(serviceId);
        }
      },

      isServiceChecked(serviceId) {
        return this.store.searchServices.includes(serviceId);
      }
    },

    mounted(){
      this.getApi();
    }
  }
</script>
<template>

  <div class="">

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Filtri</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <form action="">

          <div class="mb-5">
            <h5>Distanza:</h5>
            <label for="customRange" class="form-label">Da 50 a 150 km</label>
            <input
              type="range"
              class="form-range"
              id="customRange"
              :min="50"
              :max="150"
              v-model="store.searchRange">
            <p>Valore corrente: {{ store.searchRange }} km</p>
          </div>

          <div class="my-5">
            <label for="rooms" class="form-label">
              <h5>Numero camere:</h5>
            </label>
            <input
              name="rooms"
              type="number"
              placeholder="Numero camere"
              class="form-control w-50"
              id="rooms"
              v-model="store.searchRooms"
              min="1"
              max="125">
              <small class="text-danger fw-bold">{{ errorRooms }}</small>
          </div>

          <div class="my-5">
            <label for="beds" class="form-label">
              <h5>Posti letto:</h5>
            </label>
            <input
              name="beds"
              type="number"
              placeholder="Numero camere"
              class="form-control w-50"
              id="beds"
              v-model="store.searchBeds"
              min="1"
              max="125">
              <small class="text-danger fw-bold">{{ errorBeds }}</small>
          </div>

          <div class="my-5">
            <label for="bathroom" class="form-label">
              <h5>Numero bagni:</h5>
            </label>
           <input
             name="bathroom"
             type="number"
             placeholder="Numero bagni"
             class="form-control w-50"
             id="rooms"
             v-model="store.searchBath"
             min="1"
             max="125">
             <small class="text-danger fw-bold">{{ errorBath }}</small>
          </div>


          <div class="">
            <h5>Servizi:</h5>

            <div class="btn-group m-2" role="group" aria-label="Basic checkbox toggle button group"
              v-for="service in store.services" :key="service.id">
             <input
                type="checkbox"
                class="btn-check"
                :id="service.id"
                :checked="isServiceChecked(service.id)"
                @change="toggleService(service.id)">
              <label class="btn btn-outline-primary" :for="service.id">{{ service.name }}</label>
            </div>
          </div>

          <div class="ps-2 pt-5">
            <span class="btn btn-success" data-bs-dismiss="offcanvas" @click="validateSearch">Inizia Ricerca</span>
          </div>

        </form>
      </div>
    </div>



  </div>

</template>


<style lang="scss" scoped>


</style>