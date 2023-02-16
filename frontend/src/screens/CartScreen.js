import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export default function CartScreen() {
  const { id: productId } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get('qty') || 1;

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
