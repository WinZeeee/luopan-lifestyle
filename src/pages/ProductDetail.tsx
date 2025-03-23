
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { Loader2 } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id as string),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-12 px-4 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/shop')} className="mt-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/shop')} 
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Button>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="flex gap-2">
            <Badge className="bg-secondary text-secondary-foreground">
              {product.category}
            </Badge>
            {product.featured && (
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h2 className="mb-2 font-medium">Description</h2>
            <p className="text-muted-foreground">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>
              {product.stock > 0 
                ? `${product.stock} in stock` 
                : "Out of stock"}
            </span>
          </div>
          
          <div className="pt-4">
            <Button className="w-full gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
