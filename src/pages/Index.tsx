
import { ProductCard } from "@/components/ProductCard";
import { WarrantyBanner } from "@/components/WarrantyBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RollingText } from "@/components/RollingText";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const allProducts = await getProducts();
      return allProducts.filter(product => product.featured).slice(0, 9);
    }
  });

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
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products?.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/shop/${product.id}`}>
                    <ProductCard
                      title={product.name}
                      price={product.price}
                      imageUrl={product.imageUrl}
                      description={product.description}
                      isCustom={product.category.toLowerCase().includes("custom")}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
          
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
