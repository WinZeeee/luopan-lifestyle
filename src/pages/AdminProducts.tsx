
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Loader2, Pencil, Plus, Trash2, DollarSign, Package, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, "Price must be a positive number"),
  imageUrl: z.string().url("Must be a valid URL"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  featured: z.boolean().default(false),
  stock: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Stock must be a non-negative number"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const AdminProducts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "",
      featured: false,
      stock: "",
    }
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        imageUrl: product.imageUrl,
        category: product.category,
        featured: product.featured,
        stock: product.stock.toString(),
      });
    } else {
      setCurrentProduct(null);
      form.reset({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        featured: false,
        stock: "",
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const productData = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        imageUrl: values.imageUrl,
        category: values.category,
        featured: values.featured,
        stock: Number(values.stock),
      };
      
      if (currentProduct) {
        // Update existing product
        await updateProduct(currentProduct.id, productData);
        toast({
          title: "Product updated",
          description: `Successfully updated product "${values.name}"`,
        });
      } else {
        // Create new product
        await createProduct(productData);
        toast({
          title: "Product created",
          description: `Successfully created product "${values.name}"`,
        });
      }
      
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      toast({
        title: "Product deleted",
        description: `Successfully deleted product "${product.name}"`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          New Product
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {products?.map((product) => (
            <div key={product.id} className="flex items-start justify-between rounded-lg border p-4">
              <div className="flex gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-md">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-medium">{product.name}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="flex items-center text-sm">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {product.price.toFixed(2)}
                    </span>
                    <span className="flex items-center text-sm">
                      <Package className="mr-1 h-3 w-3" />
                      {product.stock} in stock
                    </span>
                    <span className="flex items-center text-sm">
                      <Tag className="mr-1 h-3 w-3" />
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleOpenDialog(product)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentProduct ? "Edit Product" : "Create New Product"}</DialogTitle>
            <DialogDescription>
              {currentProduct ? "Update the details of your product" : "Fill in the details to create a new product"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">
                  {currentProduct ? "Update Product" : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
