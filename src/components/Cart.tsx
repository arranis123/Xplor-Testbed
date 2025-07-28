import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CartButton() {
  const { state, toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleCart}
      className="relative"
    >
      <ShoppingCart className="h-4 w-4" />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-xplor-yellow text-xplor-black text-xs">
          {totalItems}
        </Badge>
      )}
    </Button>
  );
}

export function CartSheet() {
  const { state, removeItem, updateQuantity, clearCart, closeCart, getTotalPrice } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    // TODO: Implement Stripe checkout
    toast({
      title: "Checkout",
      description: "Checkout functionality will be implemented with Stripe integration.",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({state.items.length} items)</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 ml-2"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total: {formatPrice(getTotalPrice())}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <Button 
                  className="w-full bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}