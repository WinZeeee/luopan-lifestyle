
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
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
        <h1 className="text-2xl font-bold">Không Tìm Thấy Sản Phẩm</h1>
        <p className="mt-4 text-muted-foreground">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button onClick={() => navigate('/shop')} className="mt-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay Lại Cửa Hàng
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="container py-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/shop')} 
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay Lại Cửa Hàng
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
                Nổi Bật
              </Badge>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h2 className="mb-2 font-medium">Mô Tả</h2>
            <p className="text-muted-foreground">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>
              {product.stock > 0 
                ? `Còn ${product.stock} sản phẩm` 
                : "Hết hàng"}
            </span>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleAddToCart} 
              className="w-full gap-2"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="h-4 w-4" />
              Thêm Vào Giỏ Hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
