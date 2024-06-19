<script>
import Header from './components/partials/Header.vue';
import Footer from './components/partials/Footer.vue';
  export default {
    
    components:{
      Header,
      Footer,
    }

  }
</script>


<template>

<div class="container"></div>

  <Header />

  <router-view></router-view>

  <Footer />
  
</template>


<style lang="scss" scoped>

</style>