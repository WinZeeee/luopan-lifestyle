
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/api/orders";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form validation schema
const checkoutSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  phone: z.string().min(5, "Số điện thoại phải có ít nhất 5 ký tự"),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { state, clearCart, removeItem, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  // Submit order handler
  const onSubmit = async (data: CheckoutFormValues) => {
    if (state.items.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format items for order creation
      const orderItems = state.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      }));

      // Create the order
      const order = await createOrder(
        data.name,
        data.email,
        data.phone,
        orderItems,
        subtotal,
        data.notes
      );

      if (order) {
        // Clear the cart and redirect to success page
        clearCart();
        toast.success("Đơn hàng của bạn đã được đặt. Chúng tôi sẽ liên hệ với bạn sớm!");
        navigate("/order-confirmation", { state: { order } });
      } else {
        toast.error("Không thể đặt hàng. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Đã xảy ra lỗi khi đặt hàng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty
  if (state.items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="rounded-full bg-primary/10 p-3 text-primary w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h1>
          <p className="text-muted-foreground mb-6">
            Hãy thêm một số sản phẩm vào giỏ hàng trước khi thanh toán.
          </p>
          <Button onClick={() => navigate("/shop")}>
            Tiếp Tục Mua Sắm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <h1 className="mb-8 text-3xl font-bold">Thanh Toán</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tóm Tắt Đơn Hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded overflow-hidden">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <div className="flex text-sm text-muted-foreground">
                        <span>${item.product.price.toFixed(2)} × {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Tạm Tính</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/shop")}
          >
            Quay Lại Cửa Hàng
          </Button>
        </div>
        
        {/* Contact Information Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Liên Hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ Tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Tên của bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa Chỉ Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email.cua.ban@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số Điện Thoại</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Số điện thoại của bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghi Chú Đơn Hàng (Tùy Chọn)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Yêu cầu cụ thể hoặc thông tin về đơn hàng của bạn"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang Xử Lý..." : "Đặt Hàng"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
