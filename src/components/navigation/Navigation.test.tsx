import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Navigation } from './Navigation'

describe('Navigation Component', () => {
    it('renders the logo and title', () => {
        render(
            <MemoryRouter>
                <Navigation />
            </MemoryRouter>
        )

        const logo = screen.getByAltText('LOGO')
        const title = screen.getByText('Tech-corner')

        expect(logo).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('renders all navigation links', () => {
        render(
            <MemoryRouter>
                <Navigation />
            </MemoryRouter>
        )

        const links = [
            { path: '/', label: 'Products' },
            { path: '/cart', label: 'Cart' },
            { path: '/sign-in', label: 'Sign In' },
        ]

        links.forEach((link) => {
            const linkElement = screen.getByText(link.label)
            expect(linkElement).toBeInTheDocument()
            expect(linkElement).toHaveAttribute('href', link.path)
        })
    })

    it('applies correct styling to links', () => {
        render(
            <MemoryRouter>
                <Navigation />
            </MemoryRouter>
        )

        const linkElement = screen.getByText('Products')
        expect(linkElement).toHaveClass(
            'text-white font-bold no-underline transition-colors duration-300 hover:text-gray-300'
        )
    })
})
