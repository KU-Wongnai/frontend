import { CartTable } from "@/components/cart-table";
import FeatureIcon from "@/components/feature-icon";
import LocationSelector from "@/components/location-selector";
import { ChefHat } from "lucide-react";
import { MapPin } from "lucide-react";

function Cart() {
  return (
    <>
      <FeatureIcon />
      <main className="container mx-auto px-4 sm:px-0 pb-6">
        <section className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5 mt-6">
          {/* show your cart */}
          <div className="flex border-b mb-3 gap-2">
            <ChefHat className="text-green-600 w-8 h-8" />
            <h1 className="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
              Your Cart
            </h1>
          </div>
          <CartTable />
          {/* select location */}
          <div className="flex mb-1 mt-5 gap-2">
            <MapPin className="text-green-600 w-8 h-8" />
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
              delivery location
            </h1>
          </div>
          <LocationSelector />
        </section>
      </main>
    </>
  );
}

export default Cart;
