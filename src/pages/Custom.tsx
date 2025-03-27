
import { Button } from "@/components/ui/button";

const Custom = () => {
  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-primary">Đặt Hàng La Bàn Theo Yêu Cầu</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Những nghệ nhân bậc thầy của chúng tôi có thể tạo ra một chiếc la bàn độc đáo phù hợp với nhu cầu và sở thích cụ thể của bạn.
            Mỗi sản phẩm đặc biệt đều được chế tác tỉ mỉ bằng kỹ thuật truyền thống và vật liệu cao cấp.
          </p>
          <Button className="mt-8 bg-primary px-8 py-6 text-lg hover:bg-primary/90">
            Bắt Đầu Đặt Hàng Theo Yêu Cầu
          </Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-accent/10 p-8">
            <h2 className="font-serif text-2xl font-semibold">Quy Trình</h2>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li>1. Tư Vấn Ban Đầu</li>
              <li>2. Phê Duyệt Thiết Kế</li>
              <li>3. Lựa Chọn Vật Liệu</li>
              <li>4. Quá Trình Chế Tác</li>
              <li>5. Đảm Bảo Chất Lượng</li>
              <li>6. Giao Hàng Cuối Cùng</li>
            </ul>
          </div>
          
          <div className="rounded-lg bg-secondary/10 p-8">
            <h2 className="font-serif text-2xl font-semibold">Tùy Chọn Tùy Chỉnh</h2>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li>• Kích Thước và Kích Cỡ</li>
              <li>• Lựa Chọn Vật Liệu</li>
              <li>• Cấu Hình Vòng</li>
              <li>• Đánh Dấu Đặc Biệt</li>
              <li>• Thiết Kế Tay Cầm</li>
              <li>• Hộp Bảo Vệ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
