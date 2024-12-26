import React, { useMemo, useReducer, useRef } from 'react'
import useCartStore from '../../store/CartStore'
import CartHeader from '../../components/cart-components/cart-header/CartHeader'
import CartItem from '../../components/cart-components/cart-item/CartItem'
import CartSummary from '../../components/cart-components/cart-summary/CartSummary'
import './Cart.css'
import variables from '../../assets/variables/variables.json'

function Cart() {
    const cart = useCartStore((state) => state.cart)
    const totalCost = useCartStore((state) => state.totalCost)
    const customerBalance = useCartStore((state) => state.customerBalance)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const initialState = { isEditing: false }
    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case `${variables.cart.toggle_edit}`:
                return { ...state, isEditing: !state.isEditing }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const balanceMessage = useMemo(() => {
        return customerBalance >= totalCost
            ? `${variables.cart.can_buy}`
            : `${variables.cart.cannot_buy}`
    }, [customerBalance, totalCost])

    const cartRef = useRef<HTMLDivElement>(null)

    return (
        <div className="cart-container" ref={cartRef}>
            <CartHeader
                isEditing={state.isEditing}
                toggleEdit={() =>
                    dispatch({ type: `${variables.cart.toggle_edit}` })
                }
            />
            <div className="cart-items">
                {cart.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        removeFromCart={removeFromCart}
                        isEditing={state.isEditing}
                    />
                ))}
            </div>

            <CartSummary
                totalCost={totalCost}
                customerBalance={customerBalance}
                balanceMessage={balanceMessage}
            />
        </div>
    )
}

export default Cart
