import {isLogged} from '../../data/auth.js';

// se sei loggato non puoi vederla e vai in home
export default (to, from, next) => {
  if(isLogged()) next('/');
  else next();
}