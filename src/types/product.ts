
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  imageUrls: string[];
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
  thumbnailUrl: row.thumbnail_url,
  imageUrls: row.image_urls || [],
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
  thumbnail_url: product.thumbnailUrl,
  image_urls: product.imageUrls,
  category: product.category,
  featured: product.featured,
  stock: product.stock,
  created_at: product.createdAt,
  updated_at: product.updatedAt,
});
