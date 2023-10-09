"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { httpClient } from "@/lib/http-client";
import toast from "react-hot-toast";
import { set } from "date-fns";

declare const Omise: any;

const CheckoutPage = () => {
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  const [name, setName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvc, setCVC] = React.useState("");
  const [save, setSave] = React.useState(false);
  const [cards, setCards] = React.useState<any[]>([]);
  const [savedCard, setSavedCard] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: customer } = await httpClient.get(
          "/payment/api/customers/me"
        );

        setCards(customer.cards.data);
      } catch (err) {
        console.error(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckout = async () => {
    setLoading(true);

    Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY as string);

    let requestBody;

    // If user select a saved card. Used it.
    if (savedCard) {
      requestBody = {
        cardId: savedCard,
      };
    } else {
      const [month, year] = expiryDate.split(" / ");

      const tokenParameters = {
        // city: "New York",
        // country: "US",
        expiration_month: +month,
        expiration_year: 2000 + +year,
        name,
        number: cardNumber,
        // phone_number: "0123456789",
        // postal_code: 10320,
        security_code: +cvc,
        // state: "NY",
        // street1: "476 Fifth Avenue",
      };

      const response = await Omise.createToken("card", tokenParameters);

      console.log("Token ID: " + response["id"]);
      console.log(response);

      requestBody = {
        tokenId: response["id"],
        save,
      };
    }

    try {
      await httpClient.post("/order/api/checkout", requestBody);

      window.location.href = "/checkout/success";
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleChangeExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleChangeCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCVC(e.target.value);
  };

  const handleSetSavedCard = (value: string) => {
    setSavedCard(value);
  };

  return (
    <main className="container py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Select your card to used for payment or add a new one.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup
            onValueChange={handleSetSavedCard}
            defaultValue=""
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mb-3 h-6 w-6"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                New Card
              </Label>
            </div>
            {
              /* Saved cards */
              cards.map((card) => (
                <div key={card.id}>
                  <RadioGroupItem
                    value={card.id}
                    id={card.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={card.id}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-3 h-6 w-6">
                      {card.brand === "Visa" && <Icons.visa />}
                      {card.brand === "MasterCard" && <Icons.mastercard />}
                    </div>
                    <span>**** **** **** {card.last_digits}</span>
                  </Label>
                </div>
              ))
            }
          </RadioGroup>
          {!savedCard && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="Cardholder Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Card number</Label>
                <div className="relative">
                  <svg
                    className="absolute top-1/2 left-2 transform -translate-y-1/2"
                    {...getCardImageProps({ images } as any)}
                  />
                  <Input
                    {...getCardNumberProps({
                      onChange: handleChangeCardNumber,
                    })}
                    value={cardNumber}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="year">Month / Year</Label>
                  <Input
                    {...getExpiryDateProps({
                      onChange: handleChangeExpiryDate,
                    })}
                    value={expiryDate}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    {...getCVCProps({ onChange: handleChangeCVC })}
                    value={cvc}
                  />
                </div>
              </div>
              {meta.isTouched && meta.error && (
                <span className="text-sm text-red-600">{meta.error}</span>
              )}
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="save"
                  onCheckedChange={() => setSave(!save)}
                  checked={save}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="save"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save this card for future purchases
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Securely save your card information for future purchases.
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Pay
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default CheckoutPage;
