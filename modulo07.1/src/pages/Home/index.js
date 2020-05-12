import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartAction from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state => state.cart.reduce((sumamount, product) => {
    sumamount[product.id] = product.amount;

    return sumamount;
  }, {}));

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map((product) => ({
        ...product,
        priceformatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartAction.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceformatted}</span>
          <button
            type="button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {amount[product.id] || 0}
            </div>
            <span> ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );

}

