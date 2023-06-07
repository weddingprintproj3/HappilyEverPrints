import React, { useEffect } from 'react';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';
import './index.scss';

// importation for stripe (payment)
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_USER } from '../../utils/queries'; // query
import  {UPDATE_ORDER} from '../../utils/mutations';
const stripePromise = loadStripe('pk_live_51MBSGXHxM1wHJ7zi2itQjXky3AQ91Ud6Clahvy8yIhNDQClEzI357kPUnymD8Lip2dAGbjtuvT3PQcptK8KppjlC00tStvDCdZ');

function Cart() {
  
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const { loading, error,data: user_data } = useQuery(QUERY_USER)
  const [updateOrder] = useMutation(UPDATE_ORDER)
  useEffect(() => {
    if (data) {
      stripePromise.then( (stripe) => {
        updateOrder().then((message) => {
          stripe.redirectToCheckout({ sessionId: data.checkout.session });
        })
        
      });
    }
  }, [data]);
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  

  const orders = user_data.user.orders.filter(order => order.status === 'PENDING')
  console.log(orders)
  function calculateTotal() {
    let total = 0;
    orders.forEach(item => {
      item.products.forEach(product => {
        total += product.price * item.orderQuantity;
      });
      
    });
    return total.toFixed(2);
  }

  const renderCartItems = () => {
    if (orders.length === 0) {
      return (
        <div className='cartItem'>
          <p>Your Shopping Cart is Empty</p>
        </div>
      );
    }

    return (
      <div className='cartItem'>
        {orders.map(item => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    );
  };

  async function submitCheckout() {
    
    getCheckout();
      
  }


  if (Auth.loggedIn()){ 
    return (
      <div className="container cart-page">
        <h1>Shopping Cart</h1>
        {renderCartItems()}
        {orders.length > 0 && (
          <div className="cart-summary">
            <p>Total: <span className="total-price">${calculateTotal()}</span></p>
            <button className="checkout-button"  onClick={submitCheckout}>Checkout</button>
          </div>
  
        )}
      </div>
    );
  } else {
    return <p>Please <a href="/login" >log in</a> to proceed to checkout.</p>
  }

}

export default Cart;
