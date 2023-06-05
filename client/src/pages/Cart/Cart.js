import React, { useState }  from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

function Cart() {
  const { data } = useQuery(QUERY_USER);
  console.log(data)
  return (
    <section>
      <h1>Shopping Cart</h1>
      
    </section>
  );
}

export default Cart;