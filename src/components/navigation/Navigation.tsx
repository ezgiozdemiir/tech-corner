import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu.tsx";
import logo from '../../assets/images/logo.svg'

export function Navigation() {
  return (
    <NavigationMenu className="fixed top-0 left-0 right-0 w-full bg-indigo-800 z-10 justify-between p-5">
      <div className="flex flex-row items-center gap-2">
        <img className="w-10 fill-white" src={logo} alt="LOGO" />
        <h1 className="text-amber-600 text-4xl">Tech-corner</h1>  
      </div>
      <NavigationMenuList className="flex justify-center gap-5">
        <NavigationMenuItem className="">
          <Link
            to="/"
            className="text-white font-bold no-underline transition-colors duration-300 hover:text-gray-300"
          >
            Products
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <Link
            to="/cart"
            className="text-white font-bold no-underline transition-colors duration-300 hover:text-gray-300"
          >
            Cart
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <Link
            to="/sign-in"
            className="text-white font-bold no-underline transition-colors duration-300 hover:text-gray-300"
          >
            Sign In
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}