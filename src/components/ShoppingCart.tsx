// ShoppingCart.tsx
import React from 'react';
import { useAppContext } from '../helpers/context';
import { CartItem } from '../interfaces';

const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleRemoveItem = (itemId: number) => {
    // Remove item from the cart using dispatch
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const cartSubtotal = state.shoppingCart.reduce((total, item) => total + item.price, 0);
  const totalItemsInCart = state.shoppingCart.length;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.shoppingCart.map((item: CartItem) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Subtotal: ${cartSubtotal.toFixed(2)}</p>
      <p>Total Items in Cart: {totalItemsInCart}</p>
    </div>
  );
};

export default ShoppingCart;
