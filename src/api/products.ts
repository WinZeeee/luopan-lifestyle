
import { Product, toProduct, toProductRow } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    
    return data.map(row => toProduct(row));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    
    return toProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
};

// Create a new product
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  try {
    const productRow = {
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.imageUrl,
      category: product.category,
      featured: product.featured,
      stock: product.stock,
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert(productRow)
      .select()
      .single();
    
    if (error) throw error;
    
    return toProduct(data);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | undefined> => {
  try {
    // Convert frontend product fields to database column names
    const productRow: any = {};
    if (updates.name) productRow.name = updates.name;
    if (updates.description) productRow.description = updates.description;
    if (updates.price) productRow.price = updates.price;
    if (updates.imageUrl) productRow.image_url = updates.imageUrl;
    if (updates.category) productRow.category = updates.category;
    if ('featured' in updates) productRow.featured = updates.featured;
    if ('stock' in updates) productRow.stock = updates.stock;
    
    const { data, error } = await supabase
      .from('products')
      .update(productRow)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      return undefined;
    }
    
    return toProduct(data);
  } catch (error) {
    console.error('Error updating product:', error);
    return undefined;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};
