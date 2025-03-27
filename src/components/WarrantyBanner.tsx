
import { Shield, RefreshCw } from "lucide-react";

export const WarrantyBanner = () => {
  return (
    <div className="bg-accent py-8 text-accent-foreground">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center gap-4">
            <Shield className="h-12 w-12" />
            <div>
              <h3 className="font-serif text-xl font-semibold">Bảo Hành 100%</h3>
              <p className="mt-1 text-sm">Hoàn tiền đầy đủ cho bất kỳ lỗi sản xuất nào</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCw className="h-12 w-12" />
            <div>
              <h3 className="font-serif text-xl font-semibold">Dịch Vụ Sửa Chữa Chuyên Nghiệp</h3>
              <p className="mt-1 text-sm">Bảo trì và sửa chữa chuyên nghiệp luôn sẵn sàng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
