
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isCustom && (
            <Badge className="absolute right-2 top-2 bg-secondary text-secondary-foreground">
              Custom Made
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2 font-serif text-xl">{title}</CardTitle>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <p className="text-lg font-semibold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};
