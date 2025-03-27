
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "./ui/badge";

export const Header = () => {
  const isMobile = useIsMobile();
  const { toggleCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold text-primary">
          Luopan Crafts
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/shop" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Cửa Hàng
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/custom" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Đặt Hàng Theo Yêu Cầu
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Blog
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Giới Thiệu
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {totalItems}
              </Badge>
            )}
          </Button>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:w-[350px]">
                <div className="mt-6 flex flex-col gap-4">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 px-2 py-2 text-lg font-medium hover:bg-accent rounded-md"
                  >
                    Trang Chủ
                  </Link>
                  <Link 
                    to="/shop" 
                    className="flex items-center gap-2 px-2 py-2 text-lg font-medium hover:bg-accent rounded-md"
                  >
                    Cửa Hàng
                  </Link>
                  <Link 
                    to="/custom" 
                    className="flex items-center gap-2 px-2 py-2 text-lg font-medium hover:bg-accent rounded-md"
                  >
                    Đặt Hàng Theo Yêu Cầu
                  </Link>
                  <Link 
                    to="/blog" 
                    className="flex items-center gap-2 px-2 py-2 text-lg font-medium hover:bg-accent rounded-md"
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/about" 
                    className="flex items-center gap-2 px-2 py-2 text-lg font-medium hover:bg-accent rounded-md"
                  >
                    Giới Thiệu
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
