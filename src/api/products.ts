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
      thumbnail_url: product.thumbnailUrl,
      image_urls: product.imageUrls,
      category: product.category,
      featured: product.featured,
      stock: product.stock,
    };
    
    console.log("Creating product with data:", productRow);
    
    const { data, error } = await supabase
      .rpc('create_product', productRow)
      .single();
    
    if (error) {
      console.error('Supabase error creating product:', error);
      throw error;
    }
    
    if (!data) {
      throw new Error('No data returned from product creation');
    }
    
    return toProduct(data);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | undefined> => {
  try {
    const productRow: any = { id };
    if (updates.name) productRow.name = updates.name;
    if (updates.description) productRow.description = updates.description;
    if (updates.price !== undefined) productRow.price = updates.price;
    if (updates.thumbnailUrl) productRow.thumbnail_url = updates.thumbnailUrl;
    if (updates.imageUrls) productRow.image_urls = updates.imageUrls;
    if (updates.category) productRow.category = updates.category;
    if (updates.featured !== undefined) productRow.featured = updates.featured;
    if (updates.stock !== undefined) productRow.stock = updates.stock;
    
    const { data, error } = await supabase
      .rpc('update_product', productRow)
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
    console.log("Attempting to delete product with ID:", id);
    
    const { error } = await supabase
      .rpc('delete_product', { 
        product_id: id
      });
    
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
