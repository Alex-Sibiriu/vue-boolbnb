import {isLogged} from '../../data/auth.js';

// se sei loggato puoi entrare
export default (to, from, next) => {
  if(isLogged()) next();
  else next('/login');
}