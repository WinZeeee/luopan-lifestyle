
import { ProductCard } from "@/components/ProductCard";
import { WarrantyBanner } from "@/components/WarrantyBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RollingText } from "@/components/RollingText";

const featuredProducts = [
  {
    id: 1,
    title: "Traditional Luopan",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Classic Feng Shui compass with traditional markings and wooden base",
  },
  {
    id: 2,
    title: "Professional Luopan",
    price: 499.99,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "High-precision instrument for professional practitioners with extended rings",
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
    description: "Professional-grade San He Luopan with advanced markings and premium materials",
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
    description: "Perfect starter Luopan for feng shui students with learning guide",
  },
  {
    id: 7,
    title: "Travel Luopan",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Compact and portable Luopan perfect for on-site consultations",
  },
  {
    id: 8,
    title: "Collector's Edition Luopan",
    price: 1299.99,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "Limited edition Luopan with rare wood construction and gold inlays",
  },
  {
    id: 9,
    title: "Modern Luopan",
    price: 399.99,
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "Contemporary design with traditional accuracy for modern practitioners",
  }
];

const Index = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container px-4 text-center">
          <h1 className="animate-fade-up font-serif text-4xl font-bold text-primary md:text-6xl">
            La Bàn Phong Thủy <RollingText words={["Tinh xảo", "Tỉ Mỉ", "Cao Cấp", "Chuẩn Xác"]} />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground [animation-delay:200ms]">
            Discover our collection of meticulously crafted Feng Shui compasses,
            handmade by master artisans for perfect precision and balance.
          </p>
          <Link to="/shop">
            <Button className="mt-8 animate-fade-up bg-primary px-8 py-6 text-lg hover:bg-primary/90 [animation-delay:400ms]">
              Explore Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold animate-fade-up">
            Featured Collection
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Warranty Banner */}
      <WarrantyBanner />

      {/* Custom Orders Section */}
      <section className="bg-secondary/5 py-16">
        <div className="container px-4 text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold">Custom Luopan Orders</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Looking for a unique Luopan? We offer custom-made instruments crafted to
            your exact specifications. Each piece is carefully created by our master
            craftsmen.
          </p>
          <Link to="/custom">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Start Custom Order
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
