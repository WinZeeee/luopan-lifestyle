
import { Product } from "./product";

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Type converter functions
export const toOrder = (row: any): Order => ({
  id: row.id,
  customerName: row.customer_name,
  customerEmail: row.customer_email,
  customerPhone: row.customer_phone,
  items: row.items,
  totalAmount: row.total_amount,
  status: row.status,
  orderDate: row.order_date,
  notes: row.notes,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const toOrderRow = (order: Order): any => ({
  id: order.id,
  customer_name: order.customerName,
  customer_email: order.customerEmail,
  customer_phone: order.customerPhone,
  items: order.items,
  total_amount: order.totalAmount,
  status: order.status,
  order_date: order.orderDate,
  notes: order.notes,
  created_at: order.createdAt,
  updated_at: order.updatedAt,
});
