import './App.css';
import { Route, Routes } from 'react-router-dom';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import { Navigation } from './components/navigation/Navigation';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;