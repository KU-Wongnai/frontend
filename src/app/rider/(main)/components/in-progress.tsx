"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Delivery } from "@/interfaces/order";
import { completeDelivery, getMyDeliveriesWithStatus } from "@/services/order";
import { Truck } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const InProgressDelivery = () => {
  const [delivery, setDelivery] = useState<Delivery[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyDeliveriesWithStatus("ASSIGNED");
      setDelivery(data);
    };
    fetchData();
  }, []);

  const handleCompleteDelivery = async (deliveryId: string) => {
    try {
      const data = await completeDelivery(deliveryId);
      setDelivery((prev) => prev.filter((d) => d.id !== data.id));
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  if (delivery.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="pb-2 mb-2 text-2xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
        Delivery In Progress
      </h2>
      <div>
        {delivery.map((d) => (
          <div
            id="alert-additional-content-1"
            className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <div className="flex items-center">
              <Truck className="flex-shrink-0 w-4 h-4 mr-2" />
              <span className="sr-only">Delivery # {d.id}</span>
              <h3 className="text-lg font-medium">
                Order #{" "}
                <Link
                  href={`/rider/pickup/${d.order.id}`}
                  className="underline"
                  title="View Details"
                >
                  {d.order.id}
                </Link>
              </h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              {d.order.restaurant?.name} - {d.order.restaurant?.location}
            </div>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Complete Delivery
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Please make sure you have delivered the order to the right
                      customer. After completing the delivery, you will not be
                      able to undo this action.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleCompleteDelivery(d.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <button
                type="button"
                className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
                data-dismiss-target="#alert-additional-content-3"
                aria-label="Close"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InProgressDelivery;
