import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { Product } from '@/types/types'
import { Button } from '../../components/ui/button'
import './product-detail.css'
import variables from '../../assets/variables/variables.json'

function ProductDetails() {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [error, setError] = useState<string | null>(null)
    const fetchProduct = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/products/id/${id}`
            )

            if (!response.ok) {
                throw new Error(
                    `${variables['product-detail'].fail_fetch} ${id}`
                )
            }

            const data = await response.json()
            setProduct(data)
        } catch (error) {
            setError(`${variables['product-detail'].error_text}`)
        }
    }, [id])
    useEffect(() => {
        fetchProduct()
    }, [fetchProduct])

    if (error) {
        return <div className="error-message">{error}</div>
    }

    if (!product) {
        return <div>`${variables['product-detail'].loading}`</div>
    }

    return (
        <div className="product-details-container">
            <img
                src={product.image}
                alt={product.name}
                className="product-image"
            />
            <h2>{product.name}</h2>
            <p>{product.colorOptions}</p>
            <p>Color Options: {product.colorOptions}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.type}</p>
            <Button
                onClick={() => window.history.back()}
                className="back-button"
            >
                Go Back
            </Button>
        </div>
    )
}

export default ProductDetails
