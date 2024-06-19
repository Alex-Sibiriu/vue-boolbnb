<script>
import Loader from '../components/partials/Loader.vue'
import Services from '@/components/partials/partialsHome/Services.vue';
   export default {
    name: 'Home',

    components:{
      Loader,
      Services
    }
     
  }
</script>
    
<template>


  <div class="container my-3">

    <h1>Home</h1>
    <Loader />
    <Services />

  </div>


</template>

<style lang="scss" scoped>

</style>