import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import './Products.css'
import { Button } from '../../components/ui/button'
import useCartStore from '../../store/CartStore'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from '@/components/ui/select'
import { Product, Quantities, SelectedColor } from '@/types/types'

const ProductCard = lazy(
    () => import('../../components/product-card/ProductCard')
)

function Products() {
    const addToCart = useCartStore((state) => state.addToCart)
    const [products, setProducts] = useState<Product[]>([])
    const [selectedColor, setSelectedColor] = useState<SelectedColor>({})
    const [quantities, setQuantities] = useState<Quantities>({})
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const [minPrice, setMinPrice] = useState<number | string>('')
    const [maxPrice, setMaxPrice] = useState<number | string>('')
    const [sortOption, setSortOption] = useState<string>('default')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 10

    //useMemo hook is used for data caching for unique types for filters.
    const uniqueTypes = useMemo(() => {
        return products?.length > 0
            ? [...new Set(products.map((product) => product.type))]
            : []
    }, [products])

    //async await & try catch & fetch is used in the below
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/products?page=${currentPage}&limit=${itemsPerPage}`
                )
                const data = await response.json()
                setProducts(data.products)
                setTotalPages(data.totalPages)
                setFilteredProducts(data.products)
                setCurrentPage(data.currentPage)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [currentPage, itemsPerPage])

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1)
    }

    const handlePreviousPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
    }

    const handleColorChange = (productId: number, color: string) => {
        setSelectedColor((prevState) => ({
            ...prevState,
            [productId]: color,
        }))
    }

    const handleQuantityChange = (productId: number, quantity: number) => {
        setQuantities((prevState) => ({
            ...prevState,
            [productId]: quantity,
        }))
    }

    const filterByCategory = (type: string) => {
        setActiveFilter(type)
        if (type === 'all') {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter((product) => product.type === type)
            setFilteredProducts(filtered)
        }
    }

    const filterByPrice = () => {
        let filtered = [...products]
        if (activeFilter !== 'all') {
            filtered = filtered.filter(
                (product) => product.type === activeFilter
            )
        }

        if (minPrice !== '' || maxPrice !== '') {
            filtered = filtered.filter((product) => {
                const min = minPrice !== '' ? Number(minPrice) : 0
                const max = maxPrice !== '' ? Number(maxPrice) : Infinity
                return product.price >= min && product.price <= max
            })
        }

        setFilteredProducts(filtered)
    }

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value)
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value)
    }

    const clearFilters = () => {
        setActiveFilter('all')
        setMinPrice('')
        setMaxPrice('')
        setFilteredProducts(products)
    }

    const handleSort = (option: string) => {
        setSortOption(option)

        const sortedProducts = [...filteredProducts]
        if (option === 'price-asc') {
            sortedProducts.sort((a, b) => a.price - b.price)
        } else if (option === 'price-desc') {
            sortedProducts.sort((a, b) => b.price - a.price)
        } else if (option === 'name-asc') {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        } else if (option === 'name-desc') {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        } else {
            sortedProducts.sort((a, b) => a.id - b.id)
        }

        setFilteredProducts(sortedProducts)
    }

    return (
        <div className="app-container">
            <div className="filter-section">
                <ul className="filter-buttons">
                    <Button
                        className={`filter-button ${
                            activeFilter === 'all' ? 'active' : ''
                        }`}
                        onClick={() => filterByCategory('all')}
                    >
                        ALL
                    </Button>
                    {uniqueTypes.map((type, index) => (
                        <li key={index}>
                            <Button
                                className={`filter-button ${
                                    activeFilter === type ? 'active' : ''
                                }`}
                                onClick={() => filterByCategory(type)}
                            >
                                {type.toUpperCase()}
                            </Button>
                        </li>
                    ))}
                </ul>
                <div className="price-filter">
                    <label>
                        Min Price:
                        <Input
                            type="number"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            placeholder="Min"
                            className="price-input"
                        />
                    </label>
                    <label>
                        Max Price:
                        <Input
                            type="number"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            placeholder="Max"
                            className="price-input"
                        />
                    </label>
                    <Button className="filter-button" onClick={filterByPrice}>
                        Apply Price Filter
                    </Button>

                    <div className="sort-section">
                        <label className="mr-4">Sort by: </label>
                        <Select onValueChange={(value) => handleSort(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="price-asc">
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem value="price-desc">
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem value="name-asc">
                                    Name: A to Z
                                </SelectItem>
                                <SelectItem value="name-desc">
                                    Name: Z to A
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="clear-filters">
                        <Button
                            className="filter-button"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>
            </div>

            <div className="cards">
                <ul className="product-list flex flex-row list-none gap-5 flex-wrap justify-center">
                    {filteredProducts.map((product) => (
                        <Suspense
                            fallback={<div>Loading...</div>}
                            key={product.id}
                        >
                            <ProductCard
                                product={product}
                                selectedColor={selectedColor[product.id] || ''}
                                setSelectedColor={(color) =>
                                    setSelectedColor((prev) => ({
                                        ...prev,
                                        [product.id]: color,
                                    }))
                                }
                                quantity={quantities[product.id] || 1}
                                setQuantity={(quantity) =>
                                    setQuantities((prev) => ({
                                        ...prev,
                                        [product.id]: quantity,
                                    }))
                                }
                                addToCart={addToCart}
                            />
                        </Suspense>
                    ))}
                </ul>
            </div>
            <div>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Products
