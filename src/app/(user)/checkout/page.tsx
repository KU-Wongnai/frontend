import React from "react";
import CheckoutForm from "./form";
import Summary from "../components/summary";

const CheckoutPage = () => {
  return (
    <main className="flex flex-col-reverse lg:flex-row">
      <CheckoutForm />
      <Summary />
    </main>
  );
};

export default CheckoutPage;
