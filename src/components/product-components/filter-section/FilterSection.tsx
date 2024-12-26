import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from '@/components/ui/select'
import { FilterSectionProps } from '../interfaces/product.interface'

const FilterSection: React.FC<FilterSectionProps> = ({
    uniqueTypes,
    activeFilter,
    setFilter,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    handlePriceFilter,
    handleSort,
}) => {
    return (
        <div className="filter-section">
            <label>Filter by Category:</label>
            <select
                value={activeFilter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all">All</option>
                {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                        {type.toUpperCase()}
                    </option>
                ))}
            </select>
            <div className="price-filter">
                <Input
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                />
                <Input
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                />
                <Button onClick={handlePriceFilter}>Apply</Button>
            </div>
            <div className="sort-section">
                <Select onValueChange={handleSort}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="price-asc">
                            Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-desc">
                            Price: High to Low
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default FilterSection
