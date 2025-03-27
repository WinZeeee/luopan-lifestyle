
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
          <h1 className="text-2xl font-semibold mb-2">No order information</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your order information.
          </p>
          <Button onClick={() => navigate("/shop")}>
            Continue Shopping
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
          <h1 className="text-3xl font-bold mb-2">Order Received!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your order. We'll contact you soon to confirm the details.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Order ID: {order.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm">Contact Information</h3>
                <p>{order.customerName}</p>
                <p>{order.customerEmail}</p>
                <p>{order.customerPhone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Order Date</h3>
                <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                <h3 className="font-medium text-sm mt-2">Status</h3>
                <p className="capitalize">{order.status}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-sm mb-2">Items</h3>
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
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>

            {order.notes && (
              <div className="mt-4">
                <h3 className="font-medium text-sm mb-1">Notes</h3>
                <p className="text-muted-foreground">{order.notes}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/shop")} 
              className="w-full"
            >
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
