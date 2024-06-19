<script>
import Loader from '../components/partials/Loader.vue'
import Card from '../components/partials/Card.vue'
   export default {
    name: 'Home',

    components:{
      Loader,
      Card,
    }
     
  }
</script>
    
<template>


  <div class="container my-3">

    <h1>Home</h1>
    <Loader />
    <Card />

  </div>


</template>

<style lang="scss" scoped>

</style>