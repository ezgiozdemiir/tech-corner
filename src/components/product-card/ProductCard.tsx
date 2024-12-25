import { Button } from '../../components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { SelectDemo } from '../../components/select/SelectDemo'
import { Product } from '@/types/types'
import React from 'react'

interface ProductCardProps {
    product: Product
    selectedColor: string
    setSelectedColor: (color: string) => void
    quantity: number
    setQuantity: (quantity: number) => void
    addToCart: (product: Product, color: string, quantity: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    addToCart,
}) => {
    return (
        <li className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <div className="color-selection">
                <div>Select Color:</div>
                <SelectDemo
                    colorOptions={product.colorOptions}
                    setedColor={setSelectedColor}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        style={{
                            width: '50px',
                            marginLeft: '10px',
                        }}
                    />
                </label>
            </div>
            <Button
                className="button"
                onClick={() => addToCart(product, selectedColor, quantity)}
            >
                <ShoppingCart className="cart-button-icon" /> Add to Cart
            </Button>
        </li>
    )
}

export default ProductCard
