<script>
import Header from './components/partials/Header.vue';
import Footer from './components/partials/Footer.vue';
import {default as auth, isLogged} from './data/auth.js';
  export default {
    
    components:{
      Header,
      Footer,
    },

    computed:{
      auth,
      isLogged,
    },

  }
</script>


<template>

  <Header />

  <router-view></router-view>

  <Footer />
  
</template>


<style lang="scss" scoped>

</style>