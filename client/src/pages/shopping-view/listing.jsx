import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";

function ShoppingListing(){

    const dispatch = useDispatch();

    const {productList} = useSelector((state) => state.shopProducts);
    
    

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts);
    },[dispatch]);
   
    console.log(productList,'product List');

    return(
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
          <ProductFilter/>
          <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-bottom flex gap-3 items-center justify-between">
                <h2 className="text-lg font-extrabold">
                    All Products
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{productList?.length}</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowUpDownIcon className="h-4 w-4"/>
                            <span>Sort By</span>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuRadioGroup>
                            {sortOptions.map(sortItem => <DropdownMenuRadioItem key={sortItem.id}>
                                {sortItem.label}
                            </DropdownMenuRadioItem>)}
                        </DropdownMenuRadioGroup>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
            
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                key={productItem.id}
                  product={productItem}
                  
                />
              ))
            : null}
          </div>
        </div>
    )
}
export default ShoppingListing;