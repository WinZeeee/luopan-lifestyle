
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "@/api/orders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Loader2, Eye, PackageCheck, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Order } from "@/types/order";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  pending: <Package className="h-4 w-4" />,
  confirmed: <PackageCheck className="h-4 w-4" />,
  shipped: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
};

// Vietnamese translations for status
const statusTranslations = {
  pending: "Đang chờ",
  confirmed: "Đã xác nhận",
  shipped: "Đã gửi hàng",
  delivered: "Đã giao hàng",
  cancelled: "Đã hủy",
};

const AdminOrders = () => {
  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notes, setNotes] = useState("");

  // Format price in VND
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setNotes(order.notes || "");
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setNotes("");
  };

  const handleStatusUpdate = async (status: Order["status"]) => {
    if (!selectedOrder) return;
    
    setIsUpdating(true);
    try {
      const success = await updateOrderStatus(selectedOrder.id, status, notes);
      
      if (success) {
        toast.success(`Đã cập nhật trạng thái đơn hàng thành ${statusTranslations[status]}`);
        refetch();
        closeOrderDetails();
      } else {
        toast.error("Không thể cập nhật trạng thái đơn hàng");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý đơn hàng</CardTitle>
          <CardDescription>
            Xem và quản lý đơn hàng của khách hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{order.customerName}</span>
                        <span className="text-xs text-muted-foreground">{order.customerEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[order.status]} capitalize`}>
                        <span className="flex items-center gap-1">
                          {statusIcons[order.status]}
                          {statusTranslations[order.status]}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-lg">
                          {selectedOrder && (
                            <>
                              <SheetHeader>
                                <SheetTitle>Chi tiết đơn hàng</SheetTitle>
                              </SheetHeader>
                              <div className="space-y-6 py-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-sm font-medium">Mã đơn hàng</h3>
                                    <p className="text-sm">{selectedOrder.id}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium">Ngày đặt</h3>
                                    <p className="text-sm">
                                      {new Date(selectedOrder.orderDate).toLocaleString()}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium mb-2">Thông tin khách hàng</h3>
                                  <div className="space-y-1">
                                    <p className="text-sm">{selectedOrder.customerName}</p>
                                    <p className="text-sm">{selectedOrder.customerEmail}</p>
                                    <p className="text-sm">{selectedOrder.customerPhone}</p>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium mb-2">Sản phẩm</h3>
                                  <div className="divide-y">
                                    {selectedOrder.items.map((item, index) => (
                                      <div key={index} className="py-2 flex justify-between">
                                        <div>
                                          <p className="text-sm font-medium">{item.productName}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {item.quantity} × {formatPrice(item.unitPrice)}
                                          </p>
                                        </div>
                                        <p className="text-sm">
                                          {formatPrice(item.quantity * item.unitPrice)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium mb-2">Tổng đơn hàng</h3>
                                  <p className="text-lg font-bold">
                                    {formatPrice(selectedOrder.totalAmount)}
                                  </p>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium mb-2">Trạng thái hiện tại</h3>
                                  <Badge className={`${statusColors[selectedOrder.status]} capitalize`}>
                                    <span className="flex items-center gap-1">
                                      {statusIcons[selectedOrder.status]}
                                      {statusTranslations[selectedOrder.status]}
                                    </span>
                                  </Badge>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium mb-2">Ghi chú</h3>
                                  <Textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Thêm ghi chú về đơn hàng này"
                                    className="min-h-[100px]"
                                  />
                                </div>

                                <div className="space-y-3">
                                  <h3 className="text-sm font-medium">Cập nhật trạng thái</h3>
                                  <div className="flex flex-wrap gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1"
                                      onClick={() => handleStatusUpdate("pending")}
                                      disabled={isUpdating || selectedOrder.status === "pending"}
                                    >
                                      {statusIcons.pending} Đang chờ
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1"
                                      onClick={() => handleStatusUpdate("confirmed")}
                                      disabled={isUpdating || selectedOrder.status === "confirmed"}
                                    >
                                      {statusIcons.confirmed} Đã xác nhận
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1"
                                      onClick={() => handleStatusUpdate("shipped")}
                                      disabled={isUpdating || selectedOrder.status === "shipped"}
                                    >
                                      {statusIcons.shipped} Đã gửi hàng
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1"
                                      onClick={() => handleStatusUpdate("delivered")}
                                      disabled={isUpdating || selectedOrder.status === "delivered"}
                                    >
                                      {statusIcons.delivered} Đã giao hàng
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1 border-red-200 text-red-500 hover:bg-red-50"
                                      onClick={() => handleStatusUpdate("cancelled")}
                                      disabled={isUpdating || selectedOrder.status === "cancelled"}
                                    >
                                      {statusIcons.cancelled} Đã hủy
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Không tìm thấy đơn hàng nào</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
