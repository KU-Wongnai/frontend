import { CartTable } from "@/components/cart-table";
import FeatureIcon from "@/components/feature-icon";
import { ChefHat } from "lucide-react";

function ShowMenu() {
  return (
    <>
      <FeatureIcon />
      <main className="container mx-auto px-4 sm:px-0">
        <section className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5 mt-6">
          <div className="flex border-b mb-3 gap-2">
            <ChefHat className="text-green-600 w-8 h-8" />
            <h1 className="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
              Your Cart
            </h1>
          </div>
          <CartTable />
        </section>
      </main>
    </>
  );
}

export default ShowMenu;
