
import { Shield, RefreshCw } from "lucide-react";

export const WarrantyBanner = () => {
  return (
    <div className="bg-muted py-10 text-muted-foreground border-y border-secondary/30">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center gap-4 p-4 hover:bg-white/40 transition-colors rounded-lg backdrop-blur-sm">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-primary">Bảo Hành 100%</h3>
              <p className="mt-1 text-sm">Hoàn tiền đầy đủ cho bất kỳ lỗi sản xuất nào</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 hover:bg-white/40 transition-colors rounded-lg backdrop-blur-sm">
            <div className="bg-accent/10 p-3 rounded-full">
              <RefreshCw className="h-10 w-10 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-accent">Dịch Vụ Sửa Chữa Chuyên Nghiệp</h3>
              <p className="mt-1 text-sm">Bảo trì và sửa chữa chuyên nghiệp luôn sẵn sàng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
