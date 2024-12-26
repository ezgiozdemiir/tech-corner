export interface CartHeaderProps {
    isEditing: boolean
    toggleEdit: () => void
}

export interface CartItemProps {
    item: {
        id: number
        name: string
        price: number
        selectedColor: string
        quantity: number
    }
    removeFromCart: (id: number) => void
    isEditing: boolean
}

export interface CartSummaryProps {
    totalCost: number
    customerBalance: number
    balanceMessage: string
}