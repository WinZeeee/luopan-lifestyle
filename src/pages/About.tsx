
import { Shield, Award, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-primary">Về Luopan Crafts</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Trong hơn ba thế hệ, chúng tôi đã chế tác những chiếc la bàn chất lượng cao cấp,
            kết hợp giữa trí tuệ truyền thống và kỹ thuật chế tác chính xác hiện đại.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg bg-accent/10 p-8 text-center">
            <Shield className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold">Đảm Bảo Chất Lượng</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Mỗi chiếc la bàn đều trải qua kiểm tra chất lượng nghiêm ngặt trước khi giao hàng
            </p>
          </div>
          
          <div className="flex flex-col items-center rounded-lg bg-accent/10 p-8 text-center">
            <Award className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold">Tay Nghề Bậc Thầy</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thủ công bởi những nghệ nhân giàu kinh nghiệm sử dụng kỹ thuật truyền thống
            </p>
          </div>
          
          <div className="flex flex-col items-center rounded-lg bg-accent/10 p-8 text-center">
            <HeartHandshake className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold">Dịch Vụ Khách Hàng</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Hỗ trợ tận tâm và dịch vụ sau bán hàng cho tất cả sản phẩm của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
