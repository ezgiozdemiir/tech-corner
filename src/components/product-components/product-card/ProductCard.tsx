import { Button } from '../../ui/button'
import { ShoppingCart } from 'lucide-react'
import { SelectDemo } from '../../select/SelectDemo'
import { Product } from '@/types/types'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ProductCardProps } from '../interfaces/product.interface'

const ProductCard = forwardRef((props: ProductCardProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        focusInput: () => {
            inputRef.current?.focus()
        },
    }))

    const {
        product,
        selectedColor,
        setSelectedColor,
        quantity,
        setQuantity,
        addToCart,
    } = props

    return (
        <li className="product-card">
            <Link to={`/products/id/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </Link>
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
                        ref={inputRef}
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
            <button onClick={() => addToCart(product, selectedColor, quantity)}>
                <ShoppingCart className="cart-button-icon" /> Add to Cart
            </button>
        </li>
    )
})

export default ProductCard
