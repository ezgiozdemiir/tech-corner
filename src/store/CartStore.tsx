import { CartState, Product } from '@/types/types'; // Assuming you have these types defined
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      totalCost: 0,
      customerBalance: 100000,

      addToCart: (product: Product, selectedColor: string, quantity: number) =>
        set((state) => {
          const cost = product.price * quantity;
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                selectedColor,
                quantity,
              },
            ],
            totalCost: state.totalCost + cost,
          };
        }),

      removeFromCart: (productId: number) =>
        set((state) => {
          const itemToRemove = state.cart.find((item) => item.id === productId);
          if (!itemToRemove) return state;

          const cost = itemToRemove.price * itemToRemove.quantity;
          return {
            cart: state.cart.filter((item) => item.id !== productId),
            totalCost: state.totalCost - cost,
          };
        }),

      clearCart: () =>
        set({
          cart: [],
          totalCost: 0,
        }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
        totalCost: state.totalCost,
        customerBalance: state.customerBalance,
      }),
    }
  )
);

export default useCartStore;
