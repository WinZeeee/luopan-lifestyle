
import { Shield, RefreshCw } from "lucide-react";

export const WarrantyBanner = () => {
  return (
    <div className="bg-accent py-12 text-accent-foreground">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="font-han-serif text-2xl font-semibold">Chất Lượng Đảm Bảo</h3>
          <div className="mx-auto mt-2 h-0.5 w-16 bg-accent-foreground/70"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center gap-4 bg-accent-foreground/10 p-6 rounded-lg">
            <Shield className="h-12 w-12" />
            <div>
              <h3 className="font-han-serif text-xl font-semibold">Bảo Hành 100%</h3>
              <p className="mt-1 text-sm">Hoàn tiền đầy đủ cho bất kỳ lỗi sản xuất nào</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-accent-foreground/10 p-6 rounded-lg">
            <RefreshCw className="h-12 w-12" />
            <div>
              <h3 className="font-han-serif text-xl font-semibold">Dịch Vụ Sửa Chữa Chuyên Nghiệp</h3>
              <p className="mt-1 text-sm">Bảo trì và sửa chữa chuyên nghiệp luôn sẵn sàng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
