import React, { useEffect } from 'react';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';
import './index.scss';

// importation for stripe (payment)
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_USER } from '../../utils/queries'; // query
import  {UPDATE_ORDER} from '../../utils/mutations';
const stripePromise = loadStripe('pk_live_51MBSGXHxM1wHJ7zi2itQjXky3AQ91Ud6Clahvy8yIhNDQClEzI357kPUnymD8Lip2dAGbjtuvT3PQcptK8KppjlC00tStvDCdZ'); // Stripe API key wll be added

function Cart() {
  
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const { loading, error,data: user_data } = useQuery(QUERY_USER)
  const [updateOrder] = useMutation(UPDATE_ORDER)
  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.then((stripe) => {
        stripe.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  

  
  function calculateTotal() {
    let total = 0;
    user_data.user.orders.forEach(item => {
      item.products.forEach(product => {
        console.log(item)
        total += product.price * item.orderQuantity;
      });
      
    });
    return total.toFixed(2);
  }

  const renderCartItems = () => {
    if (user_data.user.orders.length === 0) {
      return (
        <div>
          <p>Your Shopping Cart is Empty</p>
        </div>
      );
    }

    return (
      <div>
        {user_data.user.orders.map(item => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    );
  };

  async function submitCheckout() {
    const { message } = await updateOrder();
    getCheckout();
      
  }


  if (Auth.loggedIn()){ 
    return (
      <section>
        <h1>Shopping Cart</h1>
        {renderCartItems()}
        {user_data.user.orders.length > 0 && (
          <div className="cart-summary">
            <p>Total: <span className="total-price">${calculateTotal()}</span></p>
            <button className="checkout-button"  onClick={submitCheckout}>Checkout</button>
          </div>
  
        )}
      </section>
    );
  } else {
    return <p>Please <a href="/login" >log in</a> to proceed to checkout.</p>
  }

}

export default Cart;
