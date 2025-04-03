
import { ProductCard } from "@/components/ProductCard";
import { WarrantyBanner } from "@/components/WarrantyBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RollingText } from "@/components/RollingText";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { Loader2, Star, Compass, MapPin, Users } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const allProducts = await getProducts();
      return allProducts.filter(product => product.featured).slice(0, 6);
    }
  });

  const testimonials = [
    {
      name: "Nguyễn Thái Bình",
      role: "Chuyên Gia Phong Thủy",
      content: "La bàn của Luopan Crafts là công cụ không thể thiếu trong công việc của tôi. Độ chính xác và chất lượng vật liệu vượt trội so với tất cả các sản phẩm tôi đã sử dụng trước đây."
    },
    {
      name: "Trần Minh Hà",
      role: "Giáo viên Phong Thủy",
      content: "Tôi đã đặt hàng 5 chiếc la bàn tùy chỉnh cho lớp học của mình. Học sinh của tôi rất ấn tượng với chất lượng và độ chính xác. Dịch vụ khách hàng cũng tuyệt vời."
    },
    {
      name: "Lê Văn Quân",
      role: "Kiến Trúc Sư",
      content: "La bàn tùy chỉnh mà tôi đặt hàng đã vượt quá mong đợi của tôi. Từng chi tiết đều được chăm chút tỉ mỉ và thiết kế chính xác theo yêu cầu của tôi."
    }
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section - Enhanced with traditional Feng Shui elements */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-gradient-to-r from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1582582484783-b28df7980e66?q=80&w=1974')] bg-center bg-cover"></div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="animate-fade-up font-serif text-4xl font-bold text-primary md:text-6xl mb-2">
            La Bàn Phong Thủy <RollingText words={["Tinh xảo", "Tỉ Mỉ", "Cao Cấp", "Chuẩn Xác"]} />
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto my-4"></div>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground [animation-delay:200ms]">
            Khám phá bộ sưu tập la bàn phong thủy được chế tác tỉ mỉ, 
            làm thủ công bởi các nghệ nhân bậc thầy để đạt độ chính xác và cân bằng hoàn hảo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/shop">
              <Button className="animate-fade-up bg-primary px-8 py-6 text-lg hover:bg-primary/90 [animation-delay:400ms]">
                Khám Phá Bộ Sưu Tập
              </Button>
            </Link>
            <Link to="/custom">
              <Button variant="outline" className="animate-fade-up px-8 py-6 text-lg border-secondary text-secondary hover:bg-secondary/10 [animation-delay:500ms]">
                Đặt Hàng Tùy Chỉnh
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">Về Chúng Tôi</h2>
              <div className="w-16 h-1 bg-secondary mb-6"></div>
              <p className="text-muted-foreground mb-4">
                Tại Luopan Crafts, chúng tôi tự hào là nhà sản xuất la bàn phong thủy hàng đầu với hơn 20 năm kinh nghiệm. 
                Mỗi chiếc la bàn đều được chế tác thủ công bởi các nghệ nhân bậc thầy của chúng tôi, 
                đảm bảo độ chính xác tuyệt đối và chất lượng vượt trội.
              </p>
              <p className="text-muted-foreground mb-6">
                Chúng tôi chuyên sản xuất và tùy chỉnh la bàn phong thủy cho các chuyên gia, trường học, và hiệp hội phong thủy, 
                với cam kết về chất lượng và sự trung thành với kỹ thuật chế tác truyền thống.
              </p>
              <div className="flex gap-8">
                <div className="text-center">
                  <Compass className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold">Độ Chính Xác Cao</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold">Chất Lượng Hàng Đầu</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold">Nghệ Nhân Lành Nghề</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-lg overflow-hidden shadow-lg border border-secondary/20">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="https://images.unsplash.com/photo-1584058869948-cec6bfcde09f?q=80&w=1974" 
                    alt="Nghệ nhân đang chế tác la bàn phong thủy" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="mb-2 text-center font-serif text-3xl font-bold text-primary">
            Sản Phẩm Nổi Bật
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
          
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
                      thumbnailUrl={product.thumbnailUrl}
                      description={product.description}
                      isCustom={product.category.toLowerCase().includes("custom")}
                      product={product}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary/10">
                Xem Tất Cả Sản Phẩm
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customization Services */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-lg overflow-hidden shadow-lg border border-secondary/20">
                <AspectRatio ratio={4/3}>
                  <img 
                    src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=2070" 
                    alt="La bàn phong thủy tùy chỉnh" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">Dịch Vụ Tùy Chỉnh</h2>
              <div className="w-16 h-1 bg-secondary mb-6"></div>
              <p className="text-muted-foreground mb-4">
                Chúng tôi tự hào cung cấp dịch vụ thiết kế la bàn theo yêu cầu riêng của bạn, 
                cho phép bạn kết hợp các yếu tố độc đáo, ngôn ngữ, hoặc biểu tượng vào la bàn của mình.
              </p>
              <p className="text-muted-foreground mb-6">
                Sở hữu một chiếc la bàn được cá nhân hóa không chỉ là một công cụ làm việc mà còn là một biểu tượng 
                của đẳng cấp chuyên nghiệp trong lĩnh vực phong thủy.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Tùy chỉnh kích thước và vật liệu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Khắc tên hoặc biểu tượng cá nhân</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Điều chỉnh số lượng và loại vòng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">✓</span>
                  <span>Lựa chọn ngôn ngữ cho các ký hiệu</span>
                </li>
              </ul>
              <Link to="/custom">
                <Button className="bg-primary hover:bg-primary/90">
                  Bắt Đầu Đặt Hàng Tùy Chỉnh
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="mb-2 text-center font-serif text-3xl font-bold text-primary">
            Khách Hàng Nói Gì
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="border-secondary/20">
                    <CardContent className="p-6">
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <p className="mb-4 text-muted-foreground">"{testimonial.content}"</p>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative -left-0" />
              <CarouselNext className="relative -right-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container px-4">
          <h2 className="mb-2 text-center font-serif text-3xl font-bold text-primary">
            Ý Nghĩa của La Bàn Phong Thủy
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
            La bàn phong thủy là công cụ quan trọng trong thực hành phong thủy, giúp xác định phương hướng và năng lượng trong không gian.
            Hiểu về các vòng tròn trên la bàn là chìa khóa để đọc và áp dụng đúng phong thủy.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary/20">
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">Vòng Thiên Cang</h3>
              <p className="text-muted-foreground">
                Vòng ngoài cùng của la bàn, đại diện cho 24 ngọn núi và phương hướng địa lý. 
                Đây là nền tảng cho việc xác định phương vị và luồng năng lượng.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary/20">
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">Vòng Địa Chi</h3>
              <p className="text-muted-foreground">
                Biểu thị 12 con giáp và các yếu tố thời gian, giúp xác định sự tương tác giữa không gian và thời gian
                trong việc đánh giá phong thủy của một địa điểm.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary/20">
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">Vòng Bát Quái</h3>
              <p className="text-muted-foreground">
                Thể hiện tám biểu tượng cơ bản trong triết học Trung Hoa, mỗi biểu tượng đại diện cho một khía cạnh 
                của cuộc sống và các yếu tố tự nhiên.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/blog">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                Tìm Hiểu Thêm
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container px-4 text-center">
          <h2 className="mb-2 font-serif text-3xl font-bold text-primary">
            Sẵn Sàng Cho La Bàn Phong Thủy Của Bạn?
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Liên hệ với chúng tôi ngay hôm nay để bắt đầu quy trình đặt hàng hoặc tìm hiểu thêm về các sản phẩm và dịch vụ của chúng tôi.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/custom">
              <Button className="bg-primary hover:bg-primary/90 px-8">
                Đặt Hàng Tùy Chỉnh
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8">
                Xem Bộ Sưu Tập
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>A2/11b ấp 1 xã Vĩnh Lộc B, Bình Chánh, TP.HCM</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-primary" />
              <span>info@luopancrafts.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span>0796526132</span>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Banner */}
      <WarrantyBanner />
    </div>
  );
};

export default Index;
