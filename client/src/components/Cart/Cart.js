import React, { useEffect } from 'react';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';
import './index.scss';


import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_USER } from '../../utils/queries'; // query
import  {UPDATE_ORDER} from '../../utils/mutations';
const stripePromise = loadStripe('pk_test_51MBSGXHxM1wHJ7zi3tBfTaodIZ3VwzhAqDVXiDgECL0lD2F263jo0In07J2SVQvgZTRYcGWgTKiEZuoHyTEjlPtE00JXqeXGUI');

function Cart() {
  // checkout query will be stored and called when needed
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  // loading the data for current user so that we can pull their order data
  const { loading, error,data: user_data } = useQuery(QUERY_USER) // we need to alias the error variable so we don't have variable name overlap
  const [updateOrder] = useMutation(UPDATE_ORDER) // query to change status of order
  useEffect(() => {
    // once we get cart data from resolver we redirect to stripe and update the order status to COMPLETED
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
  
  // only get the pending order as we will not be rebuying completed orders
  const orders = user_data.user.orders.filter(order => order.status === 'PENDING')

  // function to calculate the total cost
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
    // function to call item component, if no orders send test saying cart is empty
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
  // when the submit button is clicked
  async function submitCheckout() {
    
    getCheckout();
      
  }


  if (Auth.loggedIn()){ // check if user is logged in before trying to populate orders
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
