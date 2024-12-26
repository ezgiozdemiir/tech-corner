import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import ProductCard from '../product-card/ProductCard'
import { Product, Quantities, SelectedColor } from '@/types/types'
import { ProductListProps } from '../interfaces/product.interface'

const ProductList: React.FC<ProductListProps> = ({
    products,
    addToCart,
    selectedColor,
    setSelectedColor,
    quantities,
    setQuantities,
}) => {
    return (
        <ul className="product-list flex flex-row list-none gap-5 flex-wrap justify-center">
            {products.map((product) => (
                <li key={product.id}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductCard
                            product={product}
                            selectedColor={selectedColor[product.id] || ''}
                            setSelectedColor={(color: string) =>
                                setSelectedColor(color, product.id)
                            }
                            quantity={quantities[product.id] || 1}
                            setQuantity={(quantity: number) =>
                                setQuantities(quantity, product.id)
                            }
                            addToCart={() =>
                                addToCart(
                                    product,
                                    quantities[product.id] || 1,
                                    selectedColor[product.id] || ''
                                )
                            }
                        />
                    </Suspense>
                </li>
            ))}
        </ul>
    )
}

export default ProductList
