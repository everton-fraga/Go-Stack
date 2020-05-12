//function* é semelhante a   async function

import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productsExists = yield select((state) =>
    state.cart.find((prod) => prod.id === id)
  );
  //realizada a chamado a API para resgatar a informação de estoque do produto
  const stock = yield call(api.get, `/stock/${id}`); //qtde retornada da api
  const stockAmount = stock.data.amount; //qtde pedida em tela pelo usuario

  const currentAmount = productsExists ? productsExists.amount : 0; //qtde selecionada anteriormente pelo usuario

  const amount = currentAmount + 1; //qtde atual selecionada

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  if (productsExists) {
    //dispara uma action do redux
    yield put(updateAmountSuccess(id, amount));
  } else {
    //realiza a chamada a API para resgatar os dados complementares do produto
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    //dispara uma action do redux
    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
