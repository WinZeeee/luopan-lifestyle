
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Loader2, X, ImagePlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define the schema outside the component so it's not recreated on each render
const productFormSchema = z.object({
  name: z.string().min(3, "Tên sản phẩm phải có ít nhất 3 ký tự"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, "Giá phải là số dương"),
  thumbnailUrl: z.string().url("Phải là URL hợp lệ"),
  imageUrls: z.array(z.string().url("Phải là URL hợp lệ")),
  category: z.string().min(2, "Danh mục phải có ít nhất 2 ký tự"),
  featured: z.boolean().default(false),
  stock: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Số lượng phải là số không âm"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}

export const ProductFormDialog = ({ open, onOpenChange, product, onSubmit }: ProductFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ? product.price.toString() : "",
      thumbnailUrl: product?.thumbnailUrl || "",
      imageUrls: product?.imageUrls || [],
      category: product?.category || "",
      featured: product?.featured || false,
      stock: product?.stock ? product.stock.toString() : "",
    }
  });

  const handleFormSubmit = async (values: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImageUrl = () => {
    if (!newImageUrl) return;
    
    if (!/^https?:\/\/.+/.test(newImageUrl)) {
      toast({
        title: "URL không hợp lệ",
        description: "Vui lòng nhập URL hợp lệ bắt đầu bằng http:// hoặc https://",
        variant: "destructive",
      });
      return;
    }
    
    const currentUrls = form.getValues("imageUrls") || [];
    form.setValue("imageUrls", [...currentUrls, newImageUrl]);
    setNewImageUrl("");
  };

  const removeImageUrl = (index: number) => {
    const currentUrls = form.getValues("imageUrls") || [];
    const newUrls = [...currentUrls];
    newUrls.splice(index, 1);
    form.setValue("imageUrls", newUrls);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Chỉnh Sửa Sản Phẩm" : "Tạo Sản Phẩm Mới"}</DialogTitle>
          <DialogDescription>
            {product ? "Cập nhật thông tin sản phẩm của bạn" : "Điền thông tin để tạo sản phẩm mới"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
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
                  <FormLabel>Mô tả</FormLabel>
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
                    <FormLabel>Giá (VNĐ)</FormLabel>
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
                    <FormLabel>Số lượng</FormLabel>
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
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL hình ảnh đại diện</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/image.jpg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel>Hình ảnh bổ sung</FormLabel>
              <div className="flex items-center space-x-2">
                <Input 
                  value={newImageUrl} 
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <Button 
                  type="button" 
                  onClick={addImageUrl}
                  variant="secondary"
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Thêm
                </Button>
              </div>
              
              <div className="mt-2 space-y-2">
                {form.watch("imageUrls")?.map((url, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-2">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
                        <img src={url} alt={`Hình ảnh sản phẩm ${index + 1}`} className="h-full w-full object-cover" />
                      </div>
                      <span className="truncate text-sm">{url}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeImageUrl(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sản phẩm nổi bật</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Sản phẩm này sẽ được hiển thị trong các phần nổi bật
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {product ? "Đang cập nhật..." : "Đang tạo..."}
                  </>
                ) : (
                  product ? "Cập nhật sản phẩm" : "Tạo sản phẩm"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
