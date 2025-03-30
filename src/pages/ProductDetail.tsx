
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductById } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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

  // Combine thumbnail and additional images for the gallery
  const allImages = [product.thumbnailUrl, ...(product.imageUrls || [])];

  const handleAddToCart = () => {
    addItem(product);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
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
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border aspect-square">
            <img 
              src={allImages[currentImageIndex]} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
            
            {allImages.length > 1 && (
              <>
                <Button 
                  variant="secondary" 
                  className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full p-0"
                  onClick={goToPreviousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full p-0"
                  onClick={goToNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {allImages.map((image, index) => (
                <button 
                  key={index}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border ${
                    currentImageIndex === index ? 'border-primary' : 'border-muted hover:border-primary/50'
                  }`}
                  onClick={() => selectImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Image ${index + 1}`} 
                    className="h-full w-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
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
