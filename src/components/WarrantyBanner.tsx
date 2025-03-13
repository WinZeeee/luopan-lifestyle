
import { Shield, RefreshCw } from "lucide-react";

export const WarrantyBanner = () => {
  return (
    <div className="bg-accent py-8 text-accent-foreground">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center gap-4">
            <Shield className="h-12 w-12" />
            <div>
              <h3 className="font-serif text-xl font-semibold">100% Warranty Guarantee</h3>
              <p className="mt-1 text-sm">Full refund for any manufacturing defects</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCw className="h-12 w-12" />
            <div>
              <h3 className="font-serif text-xl font-semibold">Professional Repair Service</h3>
              <p className="mt-1 text-sm">Expert maintenance and repair available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
