<script>
import axios from 'axios';
import {store} from '../data/store.js';
import {setUser} from '../data/auth.js';

   export default {
    name: 'Login',

    data() {
      return{
        store,
        form:{
          email: '',
          password: '',
        },
        errors: {},
      };
    },

    computed:{
      formHasErrors(){
        return Object.keys(this.errors).length;
      }
    },
    
    methods: {
      submitForm(){
        this.error = {};
        this.isFormValid();
        if(!this.formHasErrors){
          this.login();
          console.log('prova');
        }else{
          console.log('errore');
        }
      },

      isFormValid() {
        const errors = {};
        if (!this.form.email) {
          errors.email = 'Email non corretta!';
        };

        if (!this.form.password) {
          errors.password = 'Password non corretta!';
        }

        this.errors = errors;
      },

      async login(){
        try{
          await this.$http.get('http://127.0.0.1:8000/sanctum/csrf-cookie');

          const {data} = await this.$http.post(`${store.apiUrl}login`, this.form );
          console.log(data);

          localStorage.user = JSON.stringify(data);
          setUser(data);

          this.$router.push('/');

        }catch(e){
          this.errors = {generic: "Le credenziali non sono valide"};
          console.log(e);
        }
      },

      
    },
  }
</script>
    
<template>


  <div class="container my-3">

    <div v-if="errors.generic" class="alert alert-danger">
      {{ this.errors.generic }}
    </div>
    <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input
            type="email"
            :class="{'is-invalid': errors.email}"
            v-model.trim="form.email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            :class="{'is-invalid': errors.password}"
            v-model.trim="form.password"
            id="exampleInputPassword1">
        </div>
        
        <button type="button" @click="submitForm" class="btn btn-primary">Submit</button>
    </form>

  </div>


</template>

<style lang="scss" scoped>

</style>