import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu.jsx';
import { NavLink } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button.jsx';
import { useUserRoles } from '@/hooks/useUserRoles';

export default function Navbar() {
  const { checkRole } = useUserRoles();
  const Role = checkRole('ROLE_ADMIN');
  console.log('Role:', Role);
  return (
    <NavigationMenu className={'w-full min-w-full justify-between p-3 bg-amber-300 '}>
      <NavigationMenuList>
        LOGO
        <NavigationMenuItem className={'flex gap-3'}>
          <NavLink to="/servers" className={buttonVariants({ variant: 'link' })}>
            Servers
          </NavLink>
          <NavLink to="/templates" className={buttonVariants({ variant: 'link' })}>
            Templates
          </NavLink>
          {Role && (
            <NavLink to="/users" className={buttonVariants({ variant: 'link' })}>
              Users
            </NavLink>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuItem>
        <div>ICON</div>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
