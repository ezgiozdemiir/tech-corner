import './App.css'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/products/Products'
import Cart from './pages/cart/Cart'
import { Navigation, ThemeContext } from './components/navigation/Navigation'
import ProductDetails from './pages/product-detail/product-detail'

function App() {
    return (
        <div className="App min-h-screen flex flex-col">
            <ThemeContext.Provider value="light">
                <Navigation />
            </ThemeContext.Provider>
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/products/id/:id"
                        element={<ProductDetails />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
