import React from 'react'
import './CartItem.css'
import { CartItemProps } from '../interfaces/cart.interface'

function CartItem({ item, removeFromCart, isEditing }: CartItemProps) {
    return (
        <div className="cart-item">
            {item.name} - ${item.price} - Color: {item.selectedColor} -
            Quantity: {item.quantity}
            <button
                onClick={() => removeFromCart(item.id)}
                disabled={!isEditing}
            >
                Remove
            </button>
        </div>
    )
}

export default CartItem
