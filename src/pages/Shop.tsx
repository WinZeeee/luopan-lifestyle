
import { ProductCard } from "@/components/ProductCard";

const products = [
  {
    id: 1,
    title: "Traditional Luopan",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Classic Feng Shui compass with traditional markings",
  },
  {
    id: 2,
    title: "Professional Luopan",
    price: 499.99,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "High-precision instrument for professional practitioners",
  },
  {
    id: 3,
    title: "Custom Luopan",
    price: 799.99,
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "Personalized Feng Shui compass crafted to your specifications",
    isCustom: true,
  },
  {
    id: 4,
    title: "Premium San He Luopan",
    price: 899.99,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Professional-grade San He Luopan with extended rings",
  },
  {
    id: 5,
    title: "San Yuan Luopan",
    price: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "Traditional San Yuan style compass for advanced practitioners",
  },
  {
    id: 6,
    title: "Beginner's Luopan",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "Perfect starter Luopan for feng shui students",
  },
];

const Shop = () => {
  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <h1 className="mb-8 font-serif text-3xl font-bold animate-fade-up">Our Collection</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
