
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { ProductCard } from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

const Shop = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <h1 className="mb-8 font-serif text-3xl font-bold">Bộ Sưu Tập Của Chúng Tôi</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <div key={product.id} className="animate-fade-up">
              <Link to={`/shop/${product.id}`}>
                <ProductCard
                  title={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  description={product.description}
                  isCustom={product.category.toLowerCase().includes("custom")}
                  product={product}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
