import { UserRound } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom'
const Header = () => (
  <header className="flex h-[52px] w-full shrink-0 items-center justify-between bg-[#fff1e9] px-5 text-xs text-[#2b1e1a] md:px-7">
    <div className="flex items-center gap-2 rounded-full bg-[#f8e7de] px-4 py-1.5">
      <span className="size-1.5 rounded-full bg-[#984629]" />
      <span className="font-medium">Daily Capacity:</span>
      <span className="text-[#984629]">3.5 hrs available</span>
    </div>

    {/* <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu> */}
    <div className="flex items-center gap-2">
      <Link className="text-sm font-medium hover:underline" to="/upload">Builder</Link>
      <Link className="text-sm font-medium hover:underline" to="/capacity">Capacity</Link>
    </div>

    <div className="flex items-center gap-3">
      <span className="font-medium">Ousman</span>
      <div
        aria-label="Ousman's account"
        className="flex size-7 items-center justify-center rounded-full bg-[#170f0d] text-white"
      >
        <UserRound className="size-3.5" />
      </div>
    </div>
  </header>
)

export default Header
