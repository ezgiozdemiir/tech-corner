import { Product, Quantities, SelectedColor } from "@/types/types"

export interface FilterSectionProps {
    uniqueTypes: string[]
    activeFilter: string
    setFilter: (filter: string) => void
    minPrice: string | number
    maxPrice: string | number
    setMinPrice: (price: string) => void
    setMaxPrice: (price: string) => void
    handlePriceFilter: () => void
    handleSort: (option: string) => void
}

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPrevious: () => void
    onNext: () => void
}

export interface ProductCardProps {
    product: Product
    selectedColor: string
    setSelectedColor: (color: string) => void
    quantity: number
    setQuantity: (quantity: number) => void
    addToCart: (product: Product, color: string, quantity: number) => void
}

export interface ProductListProps {
    products: Product[]
    addToCart: (product: Product, quantity: number, color: string) => void
    selectedColor: SelectedColor
    setSelectedColor: (color: string, productId: number) => void
    quantities: Quantities
    setQuantities: (quantity: number, productId: number) => void
}