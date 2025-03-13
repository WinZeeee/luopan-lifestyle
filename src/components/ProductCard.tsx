
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  isCustom?: boolean;
}

export const ProductCard = ({ title, price, imageUrl, description, isCustom = false }: ProductCardProps) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden animate-fade-in transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isCustom && (
            <Badge className="absolute right-2 top-2 bg-secondary text-secondary-foreground animate-fade-in">
              Custom Made
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <CardTitle className="mb-2 font-serif text-xl animate-fade-in">{title}</CardTitle>
        <p className="mb-4 text-sm text-muted-foreground animate-fade-in [animation-delay:100ms]">{description}</p>
        <p className="text-lg font-semibold animate-fade-in [animation-delay:200ms]">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300 animate-fade-in [animation-delay:300ms]">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
