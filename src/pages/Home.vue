<script>
import Loader from '../components/partials/Loader.vue'
import Card from '../components/partials/partialsHome/Card.vue';
import Services from '../components/partials/partialsHome/Services.vue';

   export default {
    name: 'Home',

    components:{
      Loader,
      Card,
      Services,
    }
     
  }
</script>
    
<template>


  <div class="container my-3">

    <Loader />
    <Card />
    <Services />


  </div>


</template>

<style lang="scss" scoped>

</style>