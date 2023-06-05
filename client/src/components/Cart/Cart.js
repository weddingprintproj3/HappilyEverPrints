import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';

// importation for stripe (payment)
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_USER } from '../../utils/queries'; // query

const stripePromise = loadStripe('pk_live_51MBSGXHxM1wHJ7zi2itQjXky3AQ91Ud6Clahvy8yIhNDQClEzI357kPUnymD8Lip2dAGbjtuvT3PQcptK8KppjlC00tStvDCdZ'); // Stripe API key wll be added

function Cart() {
  
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const { loading, error,data: user_data } = useQuery(QUERY_USER)
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
  
  console.log(user_data.user.orders[0])
  
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

  function submitCheckout() {
      getCheckout();

  }

  return (
    <section>
      <h1>Shopping Cart</h1>
      {renderCartItems()}
      {user_data.user.orders.length > 0 && (
        <div>
          <p>Total: ${calculateTotal()}</p>
          {Auth.loggedIn() ? (
            <button onClick={submitCheckout}>Checkout</button>
          ) : (
            <p>Please log in to proceed to checkout.</p>
          )}
        </div>

      )}
    </section>
  );
}

export default Cart;
