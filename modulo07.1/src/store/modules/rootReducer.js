// Nesse projeto só é usado o reducer de cart "carrinho"
// o user é apenas de exemplo de como proceder para ter mais de um reducer no redux

import { combineReducers } from 'redux';

import cart from './cart/reducer';
import user from './usersample/reducer';

export default combineReducers({
  cart,
  user,
});
