
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/order";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;

  if (!order) {
    return (
      <div className="container py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="rounded-full bg-primary/10 p-3 text-primary w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Không có thông tin đơn hàng</h1>
          <p className="text-muted-foreground mb-6">
            Chúng tôi không thể tìm thấy thông tin đơn hàng của bạn.
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
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <div className="rounded-full bg-green-100 p-3 text-green-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Đã Nhận Đơn Hàng!</h1>
          <p className="text-muted-foreground text-lg">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm để xác nhận chi tiết.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tóm Tắt Đơn Hàng</CardTitle>
            <CardDescription>Mã Đơn Hàng: {order.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm">Thông Tin Liên Hệ</h3>
                <p>{order.customerName}</p>
                <p>{order.customerEmail}</p>
                <p>{order.customerPhone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Ngày Đặt Hàng</h3>
                <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                <h3 className="font-medium text-sm mt-2">Trạng Thái</h3>
                <p className="capitalize">{order.status === "pending" ? "Đang xử lý" : order.status}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-sm mb-2">Sản Phẩm</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p>
                        {item.quantity} × {item.productName}
                      </p>
                    </div>
                    <p>${(item.quantity * item.unitPrice).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Tổng</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>

            {order.notes && (
              <div className="mt-4">
                <h3 className="font-medium text-sm mb-1">Ghi Chú</h3>
                <p className="text-muted-foreground">{order.notes}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/shop")} 
              className="w-full"
            >
              Tiếp Tục Mua Sắm
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
