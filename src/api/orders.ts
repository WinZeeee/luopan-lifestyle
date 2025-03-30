
import { supabase } from "@/integrations/supabase/client";
import { Order, toOrder } from "@/types/order";

// Create a new order
export const createOrder = async (
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  items: { productId: string; productName: string; quantity: number; unitPrice: number }[],
  totalAmount: number,
  notes?: string
): Promise<Order | null> => {
  try {
    const orderData = {
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      items,
      total_amount: totalAmount,
      status: "pending", 
      order_date: new Date().toISOString(),
      notes,
    };

    // Need to use the generic version since TypeScript doesn't know about our orders table yet
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error("Error creating order:", error);
      return null;
    }

    return toOrder(data);
  } catch (error) {
    console.error("Exception creating order:", error);
    return null;
  }
};

// Get all orders (for admin)
export const getOrders = async (): Promise<Order[]> => {
  try {
    // Need to use the generic version since TypeScript doesn't know about our orders table yet
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }

    return data.map(order => toOrder(order));
  } catch (error) {
    console.error("Exception fetching orders:", error);
    return [];
  }
};

// Get order by ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    // Need to use the generic version since TypeScript doesn't know about our orders table yet
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching order:", error);
      return null;
    }

    return toOrder(data);
  } catch (error) {
    console.error("Exception fetching order:", error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (
  id: string, 
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  notes?: string
): Promise<boolean> => {
  try {
    const updates: any = { status };
    if (notes !== undefined) {
      updates.notes = notes;
    }

    // Need to use the generic version since TypeScript doesn't know about our orders table yet
    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error("Error updating order:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Exception updating order:", error);
    return false;
  }
};

// New function to update just the order notes
export const updateOrderNotes = async (
  id: string,
  notes: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ notes })
      .eq('id', id);

    if (error) {
      console.error("Error updating order notes:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Exception updating order notes:", error);
    return false;
  }
};
