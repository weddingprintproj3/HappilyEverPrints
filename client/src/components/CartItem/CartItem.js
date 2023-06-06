import React from 'react';
import './index.scss';

const CartItem = ({ item }) => {

  console.log(item)
  const removeItemFromCart = () => {
    
  };


  return (
    <div className="cart-item">
      <img src={`/images/${item.products[0].image}`} alt={item.products[0].name} />
      <div>
        <h3>{item.products[0].name}</h3>
        <p>${item.products[0].price}</p>
        <button className="remove-button" onClick={removeItemFromCart}>Remove from Cart</button>
      </div>
    </div>
  );
};

export default CartItem;
