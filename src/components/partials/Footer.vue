<script>
import { store } from '../../data/store'
   export default {
    name: 'Footer',
    data(){
      return{
        store
      }
    },
    methods:{

    }

     
  }
</script>
    
<template>


  
    <div class="footer py-3">
      <div class="container">

        <div class="row">

          <!-- logo p.iva e sedi -->
          <div class="col col-12 col-sm-4 d-flex flex-column align-items-center my-4 my-md-0">
            <!-- logo sito -->
            <div class="logo-footer">
              <img src="/public/img/logo2.png" alt="logo sito">
            </div>
            
            <h5>BoolBnb</h5>
            <h6 class="mb-2">P.I {{ this.store.footerDates[4].pIva }}</h6>
            <h6>{{ this.store.footerDates[3].pIva }}</h6>
            <h6>{{ this.store.footerDates[2].address }}</h6>
            <h6>{{ this.store.footerDates[1].phone }}</h6>
          </div>

          <!-- termini e faq -->
          <div class="col col-12 col-sm-4 d-flex justify-content-center align-items-center flex-column my-4 my-md-0">
            <!-- <h6 class="links-footer" v-for="(link, index) in store.footerLinks" :key="index">{{ link }}</h6> -->
            <a href="#">Termini e condizioni</a>
            <a href="#">FAQ</a>
            <a href="#">Privacy</a>
            <a href="#">GDPR 679/2016</a>
          </div>

          <!-- social -->
          <div class="col col-12 col-sm-4 d-flex justify-content-center align-items-center flex-column my-4 my-md-0">
            <div class="social-contacts ">
              <h6 class="fst-italic mb-4">{{ this.store.footerDates[5].social }}</h6>
              <div class="social-icons d-flex justify-content-around">
                <i v-for="(icon, index) in this.store.socialIcons" :key="index" :class="icon.iconClass"></i>
              </div>
            </div> 
          </div>

        </div>
      </div>
    </div>
    


 


</template>

<style lang="scss" scoped>
@import '../../assets/scss/partials/variables';
  .footer{
    height: 200px;
    height: fit-content;
    background-color: $dark-color;

    .container{
      height: 100%;

      .col{
        color: $light-color;

        .logo-footer{
          width: 100px;
          height: 100px;
          
          

          img{
            max-width: 100%;
            max-height: 100%;
            object-fit:contain;

          }
        }

        h6{
          font-size: 0.8rem;
        }

        
        .fst-italic{
          font-size: 1rem;
        }
        
       
        i{
          width: 25%;
          
        }

      

        a{
          text-decoration: none;
          color: $light-color;
          font-size: 0.8rem;
          margin: 8px 0;

          &:hover{
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.841);
            
          }
        }
      }
    }
      
  }

  // // Media Queries

  // // ----- TABLET -----
  // // da canc
  // // @media (max-width: 992px){

  // }

  // //  ----- SMARTPHONE --------
  // @media (max-width: 768px){

    
   
  // }
</style>