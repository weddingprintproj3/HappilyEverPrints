import React from 'react';

import { useMutation } from '@apollo/client';
import { DELETE_ORDER } from '../../utils/mutations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


import './index.scss';

const CartItem = ({ item }) => {
  const [deleteOrder] = useMutation(DELETE_ORDER) // mutation to remove order from user

  const removeItemFromCart = async (event) => {
    // handler to remove item from cart
    const { data } = await deleteOrder({
      variables: { orderId: event.target.id },
    });
    if (data) {
      window.location.reload();
    }
  };


  return (
    <div className="cart-card">
      <img src={`${item.products[0].image}`} alt={item.products[0].name} />
      <div className='card-text'>
        <h3>{item.products[0].name}</h3>
        <p>${item.products[0].price}</p>
        <p>Quantity: {item.orderQuantity}</p>
        <div className="button-container">
          <button className="remove-button" id={item._id} onClick={removeItemFromCart}><span><FontAwesomeIcon icon={faTrash} color="#343131" /></span>Remove from Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
