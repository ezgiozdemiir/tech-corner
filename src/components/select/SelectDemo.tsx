import { SelectDemoProps } from '@/types/types'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
} from '../ui/select'

//colorOptions and setSelectedColor is transfered down to child from "App.jsx"
export function SelectDemo({ colorOptions, setedColor }: SelectDemoProps) {
    //handleSelectChange sets the data in SelectDemo and transfer with setSelectedColor(value) to "App.jsx"
    const handleSelectChange = (value: string) => {
        setedColor(value)
    }

    return (
        <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="select-trigger">
                <SelectValue
                    placeholder="Select a color"
                    className="select-placeholder"
                />
            </SelectTrigger>
            <SelectContent className="select-content bg-white">
                <SelectGroup>
                    <SelectLabel className="select-label">Colors</SelectLabel>
                    {colorOptions.map((color) => (
                        <SelectItem
                            key={color}
                            value={color}
                            className="select-item"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                }}
                            >
                                <div
                                    className="select-item-circle"
                                    style={{
                                        width: '15px',
                                        height: '15px',
                                        backgroundColor: color,
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                    }}
                                ></div>
                                {color}
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
