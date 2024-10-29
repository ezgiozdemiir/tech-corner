export interface CartItem extends Product {
    selectedColor: string;
    quantity: number;
  }
  
export interface CartState {
    cart: CartItem[];
    totalCost: number;
    customerBalance: number;
    addToCart: (product: Product, selectedColor: string, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

export interface SelectDemoProps {
  colorOptions: string[];
  setedColor: (color: string) => void;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colorOptions: string[];
  type: string;
}
  
export interface SelectedColor {
  [productId: number]: string;
}
  
export interface Quantities {
  [productId: number]: number;
}
  
