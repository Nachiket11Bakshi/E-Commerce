import { HousePlus , Menu , ShoppingCart , CircleUserRound , LogOut} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";

function MenuItems(){
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {
        shoppingViewHeaderMenuItems.map(menuItem => 
          <Link key={menuItem.id} to={menuItem.path} className="text-sm font-medium">
            {menuItem.label}
          </Link>
        )
      }

    </nav>
  )
}

function HeaderRightContent(){
  const {user} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function handleLogout(){
    dispatch(logoutUser());

  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
    <Button variant="outlline" size="icon">
    <ShoppingCart className="w-6 h-6"/>
    <span className="sr-only"> User Cart </span>
    </Button>
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                   {user?.userName[0].toUpperCase()}
              </AvatarFallback>

            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
          <CircleUserRound className="mr-2 w-4 h-4"/>
          Account
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleLogout}>
          <LogOut  className="mr-2 w-4 h-4"/>
          Logout
          </DropdownMenuItem>

        </DropdownMenuContent>
     </DropdownMenu>


    </div>
  )
}

function ShoppingHeader(){

  const {isAuthenticated,user} = useSelector(state=>state.auth);
  console.log(user,"user");
    return(
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div  className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
        <HousePlus className="w-6 h-6"/>
        <span className="font-bold">E-Com</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="w-6 h-6"/>
              <span className="sr-only"></span>
            </Button>

          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs"> 
          <MenuItems/>
          <HeaderRightContent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
            <MenuItems/>
        </div>
        {
          isAuthenticated? <div className="hidden lg:block">
            <HeaderRightContent/>
          </div>: null
        }

      </div>
    </header>

    );
}

export default ShoppingHeader;