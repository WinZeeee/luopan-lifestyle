
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";
import { ProductListItem } from "@/components/admin/ProductListItem";

const AdminProducts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct(null);
    }
    setIsDialogOpen(true);
  };

  const handleSubmitProduct = async (values: any) => {
    try {
      console.log("Form values:", values);
      
      const productData = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        thumbnailUrl: values.thumbnailUrl,
        imageUrls: values.imageUrls,
        category: values.category,
        featured: values.featured,
        stock: Number(values.stock),
      };
      
      console.log("Processed product data:", productData);
      
      if (currentProduct) {
        // Update existing product
        await updateProduct(currentProduct.id, productData);
        toast({
          title: "Đã cập nhật sản phẩm",
          description: `Đã cập nhật thành công sản phẩm "${values.name}"`,
        });
      } else {
        // Create new product
        await createProduct(productData);
        toast({
          title: "Đã tạo sản phẩm",
          description: `Đã tạo thành công sản phẩm "${values.name}"`,
        });
      }
      
      refetch();
    } catch (error) {
      console.error("Product save error:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu sản phẩm. Vui lòng thử lại.",
        variant: "destructive",
      });
      throw error; // Re-throw to be handled by the form component
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      toast({
        title: "Đã xóa sản phẩm",
        description: `Đã xóa thành công sản phẩm "${product.name}"`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Sản phẩm mới
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {products?.map((product) => (
            <ProductListItem 
              key={product.id} 
              product={product} 
              onEdit={handleOpenDialog}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      <ProductFormDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={currentProduct}
        onSubmit={handleSubmitProduct}
      />
    </div>
  );
};

export default AdminProducts;
