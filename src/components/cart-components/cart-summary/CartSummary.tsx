import React from 'react'
import './CartSummary.css'
import { CartSummaryProps } from '../interfaces/cart.interface'

function CartSummary({
    totalCost,
    customerBalance,
    balanceMessage,
}: CartSummaryProps) {
    return (
        <div className="cart-summary">
            <p>Your Balance: ${customerBalance}</p>
            <p>Total Cost: ${totalCost}</p>
            <p>{balanceMessage}</p>
        </div>
    )
}

export default CartSummary
