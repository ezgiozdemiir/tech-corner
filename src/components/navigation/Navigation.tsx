import { Link } from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '../ui/navigation-menu.tsx'
import logo from '../../assets/images/logo.svg'
import React from 'react'

export function Navigation() {
    const navigationItems = [
        { path: '/', label: 'Products' },
        { path: '/cart', label: 'Cart' },
        { path: '/sign-in', label: 'Sign In' },
    ]
    return (
        <NavigationMenu className="fixed top-0 left-0 right-0 w-full bg-indigo-800 z-10 justify-between p-5">
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
