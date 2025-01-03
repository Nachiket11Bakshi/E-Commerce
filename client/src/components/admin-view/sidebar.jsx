import { Fragment } from "react";
import { Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LayoutPanelTop, ShoppingBasket,Logs } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";


 const adminMenuList =[
    {
        id:'dashboard',
        label:'Dashboard',
        path:'/admin/dashboard',
        icon:<LayoutPanelTop />
    },
    {
        id:'products',
        label:'Products',
        path:'/admin/products',
        icon:<ShoppingBasket />
    },
    {
        id:'orders',
        label:'Orders',
        path:'/admin/orders',
        icon:<Logs />
    }
]

function MenuItems({setOpen}){

    const navigate = useNavigate();
    return(
        <nav className="mt-8 flex-col flex gap-2">
            {
                adminMenuList.map((menuItems)=>
                <div className="flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground" key={menuItems.id} onClick={()=>{navigate(menuItems.path)
                    setOpen? setOpen(false):null}
                }>
                   {menuItems.icon}
                   <span>{menuItems.label}</span>

                </div>
                )
            }


        </nav>
    )

}


function AdminSidebar({open,setOpen}){
    const navigate = useNavigate();

    return(
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="w-64" side="left">
                   <div className="flex flex-col h-full">
                    <SheetHeader className="border-b">
                        <SheetTitle className="flex gap-2 mt-5 mb-5">
                        <Network size={30}/>
                        <h1 className="font-extrabold text-2xl">
                        Admin Panel
                        </h1>

                        </SheetTitle>
                    </SheetHeader>
                    <MenuItems setOpen={setOpen}/>

                   </div>
                </SheetContent>

            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={()=>navigate('/admin/dashboard')} className="flex items-center cursor-pointer gap-2 ">
                <Network size={30}/>
                    <h1 className="font-extrabold text-2xl">
                        Admin Panel
                    </h1>

                </div>
                <MenuItems/>
                
            </aside>
        </Fragment>

    );
}

export default AdminSidebar;