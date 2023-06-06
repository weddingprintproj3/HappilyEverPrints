import React from 'react';

import { useMutation } from '@apollo/client';
import { DELETE_ORDER } from '../../utils/mutations'

import './index.scss';

const CartItem = ({ item }) => {
  const [deleteOrder] = useMutation(DELETE_ORDER)
  console.log(item)
  const removeItemFromCart = async (event) => {
    console.log(event.target.id)
    const { data } = await deleteOrder({
      variables: {orderId: event.target.id},
    });
    if (data) {
      window.location.reload();
    }
  };


  return (
    <div className="cart-item">
      <img src={`${item.products[0].image}`} alt={item.products[0].name} />
      <div>
        <h3>{item.products[0].name}</h3>
        <p>${item.products[0].price}</p>

        <button  className="remove-button" id={item._id} onClick={removeItemFromCart}>Remove from Cart</button>

      </div>
    </div>
  );
};

export default CartItem;
