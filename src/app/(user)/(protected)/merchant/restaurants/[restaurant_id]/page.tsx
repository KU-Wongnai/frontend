import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: any;
};

export default function Order({ params }: Props) {
  return redirect(`/merchant/restaurants/${params.restaurant_id}/dashboard`);
}
