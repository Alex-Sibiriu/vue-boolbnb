import { reactive } from 'vue';

// inizializziamo

const state = reactive({
  user: localStorage.user ? JSON.parse(localStorage.user) : null,

});


export const isLogged = () => state.user !== null;


export const setUser = user => state.user = user;


export const removeUser = () => state.user = null;


export default () => ({...state});

