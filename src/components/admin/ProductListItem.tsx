
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, Tag, Pencil, Trash2 } from "lucide-react";

interface ProductListItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductListItem = ({ product, onEdit, onDelete }: ProductListItemProps) => {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div className="flex gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-md">
          <img 
            src={product.thumbnailUrl} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-medium">{product.name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.description}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <span className="flex items-center text-sm">
              <DollarSign className="mr-1 h-3 w-3" />
              {product.price.toFixed(2)}
            </span>
            <span className="flex items-center text-sm">
              <Package className="mr-1 h-3 w-3" />
              {product.stock} in stock
            </span>
            <span className="flex items-center text-sm">
              <Tag className="mr-1 h-3 w-3" />
              {product.category}
            </span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {product.imageUrls?.length === 1 
              ? "1 additional image" 
              : product.imageUrls?.length > 1 
                ? `${product.imageUrls.length} additional images` 
                : "No additional images"}
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(product)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
