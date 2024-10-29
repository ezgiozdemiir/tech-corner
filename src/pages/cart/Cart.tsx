import { useMemo } from 'react';
import useCartStore from '../../store/CartStore';

interface CartItem {
  id: number;
  name: string;
  price: number;
  selectedColor: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalCost: number;
  customerBalance: number;
  removeFromCart: (id: number) => void;
}


function Cart() {
  const cart = useCartStore((state: CartState) => state.cart);
  const totalCost = useCartStore((state: CartState) => state.totalCost);
  const customerBalance = useCartStore((state: CartState) => state.customerBalance);
  const removeFromCart = useCartStore((state: CartState) => state.removeFromCart);

  // Use useMemo to avoid recalculating the balance message on every render
  const balanceMessage = useMemo(() => {
    return customerBalance >= totalCost
      ? 'Customer can buy cart products.'
      : 'Customer cannot buy cart products. Please remove some products.';
  }, [customerBalance, totalCost]);

  return (
    <div>
      <h2>Cart</h2>
      <p>Your Balance: ${customerBalance}</p>

      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ${item.price} - Color: {item.selectedColor} - Quantity: {item.quantity}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <p>Total Cost: ${totalCost}</p>
      <p>{balanceMessage}</p>
    </div>
  );
}

export default Cart;
