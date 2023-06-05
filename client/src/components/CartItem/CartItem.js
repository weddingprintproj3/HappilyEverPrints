import React from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(REMOVE_FROM_CART(item._id));
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;

    if (value === '0') {
      dispatch(REMOVE_FROM_CART(item._id));
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch(UPDATE_CART_QUANTITY(item._id, parseInt(value)));
      idbPromise('cart', 'put', { ...item, quantity: parseInt(value) });
    }
  };

  return (
    <div className="cart-item">
      <img src={`/images/${item.image}`} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <div>
          <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${item._id}`}
            value={item.quantity}
            onChange={onChange}
          />
        </div>
        <button onClick={removeItemFromCart}>Remove from Cart</button>
      </div>
    </div>
  );
};

export default CartItem;
