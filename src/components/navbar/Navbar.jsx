import {
    NavigationMenu,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu.jsx";
import {NavLink} from "react-router-dom";
import {buttonVariants} from "@/components/ui/button.jsx";

export default function Navbar() {
    return (
        <NavigationMenu className={"w-full min-w-full justify-between p-3 bg-amber-300 "}>
            
        
            <NavigationMenuList>
                LOGO
                <NavigationMenuItem className={"flex gap-3"}>
                    <NavLink to="/servers" className={buttonVariants({ variant: "link" })}>
                            Servers
                    </NavLink>
                    <NavLink to="/tests" className={buttonVariants({ variant: "link" })}>
                        Tests
                    </NavLink>
                    <NavLink to="/users" className={buttonVariants({ variant: "link" })}>
                        Users
                    </NavLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            
            <NavigationMenuItem>
                <div>
                    ICON
                </div>
            </NavigationMenuItem>
            
        </NavigationMenu>

    )
}