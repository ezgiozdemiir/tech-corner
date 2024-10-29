import { useEffect, useState } from 'react'; 
import { ShoppingCart } from 'lucide-react';
import './Products.css';
import { Button } from '../../components/ui/button';
import { SelectDemo } from '../../components/select/SelectDemo';
import useCartStore from '../../store/CartStore';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';
import { Product, Quantities, SelectedColor } from '@/types/types';

function Products() {
  const addToCart = useCartStore(state => state.addToCart);
  // Keeps products from API fetch and selectedColor from child "SelectDemo"
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<SelectedColor>({});
  const [quantities, setQuantities] = useState<Quantities>({});
  // State for filtered products, active filter, and price range
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');
  const [sortOption, setSortOption] = useState<string>('default');
  // Unique types for filter buttons
  const uniqueTypes = [...new Set(products.map(product => product.type))];

  // Fetches data from API
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all data
      });
  }, []);

  // Update selected color for a product
  const handleColorChange = (productId: number, color: string) => {
    setSelectedColor(prevState => ({
      ...prevState,
      [productId]: color,
    }));
  };

  // Update quantity of the product
  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities(prevState => ({
      ...prevState,
      [productId]: quantity,
    }));
  };

  // Filters products by category
  const filterByCategory = (type: string) => {
    setActiveFilter(type); // Set the active category for button highlighting
    if (type === 'all') {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(product => product.type === type);
      setFilteredProducts(filtered); // Show filtered products by category
    }
  };

  // Filters products by price (triggered by Apply Filters button)
  const filterByPrice = () => {
    let filtered = [...products]; // Start with all products
    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => product.type === activeFilter); // Apply category filter
    }

    // Apply price range filter
    if (minPrice !== '' || maxPrice !== '') {
      filtered = filtered.filter(product => {
        const min = minPrice !== '' ? Number(minPrice) : 0;
        const max = maxPrice !== '' ? Number(maxPrice) : Infinity;
        return product.price >= min && product.price <= max;
      });
    }

    setFilteredProducts(filtered); // Update filtered products
  };

  // Handle price range changes (without filtering immediately)
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  // Clear all filters (category and price)
  const clearFilters = () => {
    setActiveFilter('all');
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(products); // Reset to all products
  };

  const handleSort = (option: string) => {
    setSortOption(option);
  
    const sortedProducts = [...filteredProducts];
    if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort by price ascending
    } else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort by price descending
    } else if (option === 'name-asc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name ascending
    } else if (option === 'name-desc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); // Sort by name descending
    } else {
      sortedProducts.sort((a, b) => a.id - b.id); // Default sort by ID
    }
  
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="app-container">
      <div className="filter-section">
        <ul className="filter-buttons">
          <Button
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} // Add active class
            onClick={() => filterByCategory('all')}
          >
            ALL
          </Button>
          {uniqueTypes.map((type, index) => (
            <li key={index}>
              <Button
                className={`filter-button ${activeFilter === type ? 'active' : ''}`} // Add active class
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
    <SelectContent className='bg-white'>
      <SelectItem value="default">Default</SelectItem>
      <SelectItem value="price-asc">Price: Low to High</SelectItem>
      <SelectItem value="price-desc">Price: High to Low</SelectItem>
      <SelectItem value="name-asc">Name: A to Z</SelectItem>
      <SelectItem value="name-desc">Name: Z to A</SelectItem>
    </SelectContent>
  </Select>
</div>
<div className="clear-filters">
          <Button className="filter-button" onClick={clearFilters}>
            Clear Filters
          </Button>
          </div>
        </div>
        
      </div>

      <div className="cards">
        <ul className="product-list flex flex-row list-none gap-5 flex-wrap justify-center">
          {filteredProducts.map(product => (
            <li key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <div className="color-selection">
                <div>Select Color:</div>
                <SelectDemo
                  colorOptions={product.colorOptions}
                  setedColor={(color: string) => handleColorChange(product.id, color)}
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={quantities[product.id] || 1}
                    min="1"
                    onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                    style={{ width: '50px', marginLeft: '10px' }}
                  />
                </label>
              </div>
              <Button
                className="button"
                onClick={() => addToCart(product, selectedColor[product.id], quantities[product.id] || 1)}
              >
                <ShoppingCart className="cart-button-icon" /> Add to Cart
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
