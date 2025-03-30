import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const { state, toggleCart, removeItem, updateQuantity, totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {state.items.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="space-y-4 pr-2">
                {state.items.map((item) => (
                  <CartItemCard 
                    key={item.product.id}
                    item={item}
                    onRemove={() => removeItem(item.product.id)}
                    onUpdateQuantity={(quantity) => updateQuantity(item.product.id, quantity)}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-4">
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center flex-col space-y-3">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <div className="text-xl font-medium">Your cart is empty</div>
            <p className="text-muted-foreground text-center">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={toggleCart} variant="outline">
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItemCard = ({ item, onRemove, onUpdateQuantity }: CartItemCardProps) => {
  const { product, quantity } = item;

  return (
    <div className="flex items-start gap-3">
      <div className="h-16 w-16 rounded-md overflow-hidden bg-secondary/20">
        <img
          src={item.product.thumbnailUrl}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="font-medium">{product.name}</h4>
        <div className="text-sm text-muted-foreground">
          ${product.price.toFixed(2)} × {quantity}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center">{quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
