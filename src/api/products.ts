
import { Product } from "@/types/product";

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Traditional Luopan",
    description: "Classic Feng Shui compass with traditional markings",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    category: "compass",
    featured: true,
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Professional Luopan",
    description: "High-precision instrument for professional practitioners",
    price: 499.99,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    category: "compass",
    featured: true,
    stock: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Custom Luopan",
    description: "Personalized Feng Shui compass crafted to your specifications",
    price: 799.99,
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "compass",
    featured: false,
    stock: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockProducts];
};

// Get a single product by ID
export const getProductById = async (id: number): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(product => product.id === id);
};

// Create a new product
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newProduct: Product = {
    ...product,
    id: mockProducts.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockProducts.push(newProduct);
  return newProduct;
};

// Update an existing product
export const updateProduct = async (id: number, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const productIndex = mockProducts.findIndex(product => product.id === id);
  
  if (productIndex !== -1) {
    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    return mockProducts[productIndex];
  }
  
  return undefined;
};

// Delete a product
export const deleteProduct = async (id: number): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const productIndex = mockProducts.findIndex(product => product.id === id);
  
  if (productIndex !== -1) {
    mockProducts.splice(productIndex, 1);
    return true;
  }
  
  return false;
};
