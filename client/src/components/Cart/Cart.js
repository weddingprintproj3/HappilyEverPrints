import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../CartItem';
import Auth from '../utils/auth';

// importation for stripe (payment)
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries'; // query

const stripePromise = loadStripe('API_KEY'); // Stripe API key wll be added

function Cart() {
  const state = useSelector(state => state);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((stripe) => {
        stripe.redirectToCheckout({ sessionId: data.checkout.sessionId });
      });
    }
  }, [data]);

  function calculateTotal() {
    let total = 0;
    state.cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  }

  const renderCartItems = () => {
    if (state.cart.length === 0) {
      return (
        <div>
          <p>Your Shopping Cart is Empty</p>
        </div>
      );
    }

    return (
      <div>
        {state.cart.map(item => (
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
      {state.cart.length > 0 && (
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
