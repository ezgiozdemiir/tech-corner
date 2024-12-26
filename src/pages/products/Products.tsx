import {
    useState,
    useEffect,
    useMemo,
    useDeferredValue,
    useId,
    useLayoutEffect,
    useInsertionEffect,
    useTransition,
} from 'react'
import './Products.css'
import FilterSection from '../../components/product-components/filter-section/FilterSection'
import ProductList from '../../components/product-components/product-list/ProductList'
import Pagination from '../../components/product-components/pagination/Pagination'
import useCartStore from '../../store/CartStore'
import { Product } from '@/types/types'
import { ToastContainer, toast } from 'react-toastify'
import variables from '../../assets/variables/variables.json'

type SelectedColor = { [key: number]: string }
type Quantities = { [key: number]: number }

function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [activeFilter, setActiveFilter] = useState('all')
    const [minPrice, setMinPrice] = useState<string>('')
    const [maxPrice, setMaxPrice] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [selectedColor, setSelectedColor] = useState<SelectedColor>({})
    const [quantities, setQuantities] = useState<Quantities>({})
    const itemsPerPage = 10
    const addToCart = useCartStore((state) => state.addToCart)
    const [highlightStyleId] = useState(useId())
    const [isPending, startTransition] = useTransition()
    const deferredFilter = useDeferredValue(activeFilter)
    const notify = () => toast('')
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/products?page=${currentPage}&limit=${itemsPerPage}`
                )
                const data = await response.json()
                setProducts(data.products)
                setFilteredProducts(data.products)
                setTotalPages(data.totalPages)
            } catch (error) {
                toast(`${variables.products.error}`)
            }
        }
        fetchProducts()
    }, [currentPage])

    const uniqueTypes = useMemo(
        () => [...new Set(products.map((p) => p.type))],
        [products]
    )

    useInsertionEffect(() => {
        const style = document.createElement('style')
        style.textContent = `#${highlightStyleId} .highlight { background-color: yellow; }`
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [highlightStyleId])

    useLayoutEffect(() => {
        const productList = document.getElementById('app-container')
        if (productList) {
            const boundingRect = productList.getBoundingClientRect()
            console.log(boundingRect)
        }
    }, [filteredProducts])

    const handlePriceFilter = () => {
        let filtered = [...products]
        if (activeFilter !== 'all') {
            filtered = filtered.filter((p) => p.type === activeFilter)
        }
        if (minPrice || maxPrice) {
            const min = Number(minPrice) || 0
            const max = Number(maxPrice) || Infinity
            filtered = filtered.filter((p) => p.price >= min && p.price <= max)
        }
        setFilteredProducts(filtered)
    }
    const handleFilter = (type: string) => {
        startTransition(() => {
            setActiveFilter(type)
            setFilteredProducts(
                type === 'all'
                    ? products
                    : products.filter((p) => p.type === type)
            )
        })
    }
    const handleSort = (option: string) => {
        const sorted = [...filteredProducts]
        if (option === 'price-asc') sorted.sort((a, b) => a.price - b.price)
        else if (option === 'price-desc')
            sorted.sort((a, b) => b.price - a.price)
        setFilteredProducts(sorted)
    }
    const handleAddToCart = (
        product: Product,
        quantity: number,
        color: string
    ) => {
        addToCart(product, color, quantity)
    }
    return (
        <div id="app-container" className="app-container">
            <div>
                <button onClick={notify}>Notify!</button>
                <ToastContainer />
            </div>
            <FilterSection
                uniqueTypes={uniqueTypes}
                activeFilter={deferredFilter}
                setFilter={handleFilter}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                handlePriceFilter={handlePriceFilter}
                handleSort={handleSort}
            />
            {isPending && <p>Updating product list...</p>}
            <div className={highlightStyleId}>
                <ProductList
                    products={filteredProducts}
                    addToCart={handleAddToCart}
                    selectedColor={selectedColor}
                    setSelectedColor={(color: string, productId: number) =>
                        setSelectedColor((prev) => ({
                            ...prev,
                            [productId]: color,
                        }))
                    }
                    quantities={quantities}
                    setQuantities={(quantity: number, productId: number) =>
                        setQuantities((prev) => ({
                            ...prev,
                            [productId]: quantity,
                        }))
                    }
                />
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                onNext={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
            />
        </div>
    )
}

export default Products
