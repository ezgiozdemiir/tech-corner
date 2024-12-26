import { Link } from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '../ui/navigation-menu.tsx'
import logo from '../../assets/images/logo.svg'
import React, { useContext, useDebugValue } from 'react'

export const ThemeContext = React.createContext('light')

export function Navigation() {
    const theme = useContext(ThemeContext)
    useDebugValue(theme === 'light' ? 'Light Theme' : 'Dark Theme')
    const themeClass =
        theme === 'light'
            ? 'bg-indigo-800 text-white'
            : 'bg-gray-900 text-gray-200'

    const navigationItems = [
        { path: '/', label: 'Products' },
        { path: '/cart', label: 'Cart' },
    ]
    return (
        <NavigationMenu
            className={`fixed top-0 left-0 right-0 w-full bg-indigo-800 z-10 justify-between p-5  ${themeClass}`}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="w-10 fill-white" src={logo} alt="LOGO" />
                <h1 className="text-amber-600 text-4xl">Tech-corner</h1>
            </div>
            <NavigationMenuList className="flex justify-center gap-5">
                {navigationItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <Link
                            to={item.path}
                            className="text-white font-bold no-underline transition-colors duration-300 hover:text-gray-300"
                        >
                            {item.label}
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
