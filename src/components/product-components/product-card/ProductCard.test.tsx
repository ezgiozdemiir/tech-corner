import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from './ProductCard'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
        <a href={to}>{children}</a>
    ),
}))

describe('ProductCard Component', () => {
    const mockProduct = {
        id: 1,
        name: 'Sample Product',
        price: 99.99,
        image: 'https://via.placeholder.com/150',
        colorOptions: ['Red', 'Blue', 'Green'],
        type: 'mobile',
    }

    const mockSetSelectedColor = jest.fn()
    const mockSetQuantity = jest.fn()
    const mockAddToCart = jest.fn()

    const defaultProps = {
        product: mockProduct,
        selectedColor: 'Red',
        setSelectedColor: mockSetSelectedColor,
        quantity: 1,
        setQuantity: mockSetQuantity,
        addToCart: mockAddToCart,
    }

    it('matches the snapshot', () => {
        const { asFragment } = render(<ProductCard {...defaultProps} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders product details', () => {
        render(<ProductCard {...defaultProps} />)
        expect(screen.getByText('Sample Product')).toBeInTheDocument()
        expect(screen.getByText('Price: $99.99')).toBeInTheDocument()
    })

    it('calls setQuantity when quantity is changed', () => {
        render(<ProductCard {...defaultProps} />)
        const quantityInput = screen.getByLabelText('Quantity:')
        fireEvent.change(quantityInput, { target: { value: '3' } })
        expect(mockSetQuantity).toHaveBeenCalledWith(3)
    })

    it('calls addToCart when Add to Cart button is clicked', async () => {
        render(<ProductCard {...defaultProps} />)
        const button = screen.getByRole('button', { name: /add to cart/i })
        fireEvent.click(button)
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 'Red', 1)
    })
})
