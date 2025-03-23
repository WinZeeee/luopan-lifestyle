
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

// Type converter functions to convert between database rows and frontend types
export const toProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  description: row.description,
  price: row.price,
  imageUrl: row.image_url,
  category: row.category,
  featured: row.featured,
  stock: row.stock,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const toProductRow = (product: Product): any => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  image_url: product.imageUrl,
  category: product.category,
  featured: product.featured,
  stock: product.stock,
  created_at: product.createdAt,
  updated_at: product.updatedAt,
});
