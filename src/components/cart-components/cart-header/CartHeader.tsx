import React from 'react'
import './CartHeader.css'
import { CartHeaderProps } from '../interfaces/cart.interface'
import variables from '../../../assets/variables/variables.json'

function CartHeader({ isEditing, toggleEdit }: CartHeaderProps) {
    return (
        <div className="cart-header">
            <h2>Cart</h2>
            <button onClick={toggleEdit}>
                {isEditing
                    ? `${variables['cart-header'].stop_editing}`
                    : `${variables['cart-header'].edit_cart}`}
            </button>
        </div>
    )
}

export default CartHeader
