<script>
import { isLogged, removeUser } from '@/data/auth';
import {store} from '../../../data/store.js';

   export default {
    name: 'Dropdown',

    data() {
      return {
        user: null
      };
    },
    computed:{
      isLogged,
      
    },

    methods:{
      async logout(){
        try{
          await this.$http.delete(store.apiUrl + 'logout');
          localStorage.removeItem('user');
          removeUser();
          if(this.$route.path === '/'){

            window.location.reload();
          }else{

            this.$router.push('/');
          }

        }catch(e){
          console.log('error')
        }
      }
    },

    mounted() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
     
  }
</script>
    
<template>


  <div class="error">

  
    
    <div class="dropdown">
      <span v-if="isLogged && user" class="me-3 fw-bold">
        {{user.name}}
        {{user.surname}}
      </span>
        <a class=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-user"></i>
        </a>

        <ul class="dropdown-menu border-0 mt-2 "  v-if="!isLogged">
          <li><router-link class="dropdown-item fs-5" :to="{name: 'login'}" >Accedi</router-link></li>
          <li><a class="dropdown-item fs-5" href="http://127.0.0.1:8000/register">Registrati</a></li>
         
        </ul>
        <ul class="dropdown-menu border-0 mt-2 "  v-else>
          <li><a class="dropdown-item fs-5" href="http://127.0.0.1:8000/admin">Menu di controllo</a></li>
          <li><p class="dropdown-item fs-5 pb-0" @click="logout" >Esci</p></li>
         
        </ul>
        
    </div>

   

  </div>


</template>

<style lang="scss" scoped>
  a,p,span {
    font-size: 1.5rem;
    color: #eaeaea;
  }

  
  
  .dropdown-menu{
    background-color: rgba(157, 6, 26, 0.699); 
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.7);
    z-index: 99;
    
  }
</style>