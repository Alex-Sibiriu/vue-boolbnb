<template>
  <div class=" position-relative">
    <swiper
    :spaceBetween="0"
    :centeredSlides="true"
    :autoplay="{
      delay: 6000,
      disableOnInteraction: false,
      allowTouchMove: false, 
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="false"
    :modules="modules"
    class="mySwiper"
  >
    
    
    <swiper-slide><img src="/img/due.jpg" alt="Image 2" /></swiper-slide>
    <swiper-slide><img src="/img/tre.webp" alt="Image 3" /></swiper-slide>
    <swiper-slide><img src="/img/quattro.webp" alt="Image 4" /></swiper-slide>
    <swiper-slide><img src="/img/cinque.jpg" alt="Image 5" /></swiper-slide>
    <swiper-slide><img src="/img/sei.webp" alt="Image 6" /></swiper-slide>
  </swiper>
  <nav class="position-absolute z-2 top-0 mt-3 d-flex justify-content-between align-items-center rounded-3 px-3 start-50 translate-middle-x">
      <img src="/img/castello-aborto.png" alt="aborto">
      <a href=""><i class="fa-solid fa-user"></i></a>
    </nav>
    <div class="searchbar position-absolute p-5 rounded-3 z-3 w-75">
      <form class="form-inline my-2 my-lg-0 text-center">

        <h1>Ricerca castelli</h1>

        <div class="d-flex justify-content-around">
          
          <input class="form-control mr-sm-2 me-3 w-75" type="search" placeholder="Ricerca castelli" aria-label="Search">
          <button class=" rounded-3 my-2 my-sm-0 px-2" type="submit">Cerca</button>


        </div>
      
      
    </form>


    </div>

  </div>
  
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // import required modules
  import { Autoplay, Navigation } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Navigation],
      };
    },
  };
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

nav {
  height: 100px;
 
  width: 98%;

  img {
    height: 80%;
    opacity: 1; 
  }

  a {
    font-size: 1.5rem;
    color: #eaeaea;
  }
}

/* Aggiungi stile al form */
.searchbar {
  
  
  background-color: rgba(5, 28, 44, 0.699); 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  
  h1{
    color: #eaeaea;
    margin-bottom: 30px;
  }
  button{
    background-color: #eaeaea;
    color: rgb(5, 28, 44) ;
  }
}


/* Stili Swiper */
.swiper {
  width: 100%;
  height: 100vh;
  position: relative;
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
</style>
