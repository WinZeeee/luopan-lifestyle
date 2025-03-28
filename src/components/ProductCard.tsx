
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  isCustom?: boolean;
  product?: Product;
}

export const ProductCard = ({ title, price, imageUrl, description, isCustom = false, product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      addItem(product);
    }
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-secondary/20 bg-white">
      <CardHeader className="p-0">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          {isCustom && (
            <Badge className="absolute right-2 top-2 bg-secondary text-secondary-foreground">
              Đặt Riêng
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <CardTitle className="mb-2 font-serif text-xl text-primary">{title}</CardTitle>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <p className="text-lg font-semibold text-accent">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300 group-hover:shadow-md"
          onClick={handleAddToCart}
          disabled={!product}
        >
          Thêm Vào Giỏ Hàng
        </Button>
      </CardFooter>
    </Card>
  );
};
