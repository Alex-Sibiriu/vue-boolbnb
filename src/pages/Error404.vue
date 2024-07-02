<script>
   export default {
    name: 'Error404',

     
  }
</script>
    
<template>



  <div class="error d-flex justify-content-center align-items-center">

    <div class="errorText text-center">

      <h1>Error404</h1>
    
      <h2>Pagina non trovata</h2>
    </div>




    


   




  </div>


</template>

<style lang="scss" scoped>

.error{
  background-image: url('/public/img/burning-castle.jpg');
  
  height: calc(100vh - 100px);
  width: 100%;
  color: white;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  
  
  
}
.errorText{
  h1{font-size: 7rem;}
  h1,h2{
    
    
    color: rgba($color: #ffffff8a, $alpha: 0.5);
    text-shadow: black 3px 3px 3px ;
  }
}



</style>