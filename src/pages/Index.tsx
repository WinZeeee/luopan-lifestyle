
import { ProductCard } from "@/components/ProductCard";
import { WarrantyBanner } from "@/components/WarrantyBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RollingText } from "@/components/RollingText";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { Loader2, Compass } from "lucide-react";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const allProducts = await getProducts();
      return allProducts.filter(product => product.featured).slice(0, 9);
    }
  });

  return (
    <div className="min-h-screen animate-fade-in bg-muted">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center bg-[url('/src/assets/feng-shui-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-primary/30 to-transparent"></div>
        <div className="container relative z-10 px-4 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Compass className="h-5 w-5 text-secondary animate-float" />
            <span className="text-white text-sm font-medium">Nghệ Thuật Phong Thủy Truyền Thống</span>
          </div>
          
          <h1 className="animate-fade-up font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            La Bàn Phong Thủy <RollingText words={["Tinh xảo", "Tỉ Mỉ", "Cao Cấp", "Chuẩn Xác"]} />
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg text-white/85 [animation-delay:200ms] backdrop-blur-sm bg-black/10 p-4 rounded-lg">
            Khám phá bộ sưu tập la bàn phong thủy được chế tác tỉ mỉ, 
            làm thủ công bởi các nghệ nhân bậc thầy để đạt độ chính xác và cân bằng hoàn hảo.
          </p>
          
          <div className="mt-10 animate-fade-up [animation-delay:400ms]">
            <Link to="/shop">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-serif border border-secondary/50 shadow-lg">
                Khám Phá Bộ Sưu Tập
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-muted to-transparent"></div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mb-14 text-center">
            <h2 className="inline-block border-b-2 border-secondary pb-2 text-center font-serif text-3xl font-bold text-primary animate-fade-up">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Những sản phẩm la bàn được chế tác tỉ mỉ, kết hợp giữa kỹ thuật truyền thống và thiết kế hiện đại
            </p>
          </div>
          
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
              <Button variant="outline" size="lg" className="font-serif border-2 border-primary/30 text-primary">
                Xem Tất Cả Sản Phẩm
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Warranty Banner */}
      <WarrantyBanner />

      {/* Custom Orders Section */}
      <section className="bg-[url('/src/assets/feng-shui-bg.jpg')] bg-cover bg-fixed py-20 relative">
        <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm"></div>
        <div className="container relative z-10 px-4 text-center">
          <div className="mx-auto max-w-3xl rounded-xl bg-white/90 p-8 shadow-xl backdrop-blur-md">
            <h2 className="mb-6 font-serif text-3xl font-bold text-primary">Đặt Hàng La Bàn Theo Yêu Cầu</h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              Bạn đang tìm kiếm một chiếc la bàn độc đáo? Chúng tôi cung cấp dịch vụ làm la bàn 
              theo đúng thông số kỹ thuật của bạn. Mỗi sản phẩm đều được chế tác cẩn thận bởi 
              các nghệ nhân bậc thầy của chúng tôi.
            </p>
            <Link to="/custom">
              <Button className="bg-accent border border-accent/50 text-accent-foreground hover:bg-accent/90 font-serif">
                Bắt Đầu Đặt Hàng Theo Yêu Cầu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
