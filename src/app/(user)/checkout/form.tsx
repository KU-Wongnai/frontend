"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { httpClient } from "@/lib/http-client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input/input";
import PhoneNumberInput from "@/components/phone-number-input";

declare const Omise: any;

const checkoutSchema = z
  .object({
    name: z.string().optional(),
    phoneNumber: z.string(),
    deliveryAddress: z.string().min(1, "Address is required"),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
    save: z.boolean(),
    savedCard: z.string().optional(),
  })
  .refine((data) => isValidPhoneNumber(data.phoneNumber), {
    message: "Invalid phone number",
    path: ["phoneNumber"],
  })
  .refine((data) => data.savedCard || data.name, {
    path: ["name"],
    message: "Cardholder name is required",
  })
  .refine((data) => data.savedCard || data.cardNumber, {
    path: ["cardNumber"],
    message: "Card number is required",
  })
  .refine((data) => data.savedCard || data.expiryDate, {
    path: ["expiryDate"],
    message: "Expiry date is required",
  })
  .refine((data) => data.savedCard || data.cvc, {
    path: ["cvc"],
    message: "CVC is required",
  });

type TCheckoutForm = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      deliveryAddress: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      save: false,
      savedCard: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  const [cards, setCards] = React.useState<any[]>([]);
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

  const handleCheckout = async (data: TCheckoutForm) => {
    console.log(data);
    console.log(formatPhoneNumber(data.phoneNumber));

    const {
      name,
      phoneNumber,
      deliveryAddress,
      cardNumber,
      expiryDate,
      cvc,
      save,
      savedCard,
    } = data;

    setLoading(true);

    Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY as string);

    // If user select a saved card. Used it.
    if (savedCard) {
      await handlePayment({
        cardId: savedCard,
        phoneNumber,
        deliveryAddress,
      });
      setLoading(false);
      return;
    } else {
      if (!name || !cardNumber || !expiryDate || !cvc) {
        setLoading(false);
        return;
      }

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

      console.log(tokenParameters);

      // const response = await Omise.createToken("card", tokenParameters);
      Omise.createToken(
        "card",
        tokenParameters,
        async function (statusCode: any, response: any) {
          console.log(response);
          console.log("Token ID: " + response["id"]);
          await handlePayment({
            tokenId: response["id"],
            phoneNumber,
            deliveryAddress,
            save,
          });
          setLoading(false);
        }
      );
    }
  };

  const handlePayment = async (requestBody: any) => {
    try {
      await httpClient.post("/order/api/checkout", requestBody);
      window.location.href = "/checkout/success";
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="md:container px-2 md:px-6 py-12 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCheckout)}>
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Fill in your information to complete your order.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <div className="mb-6">
                  <h2 className="font-bold">Contact</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    For rider to contact you if anything goes wrong.
                  </p>
                </div>
                <FormField
                  name="phoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <Label htmlFor="phoneNumber">Phone number</Label>
                      <PhoneNumberInput
                        onChange={field.onChange}
                        value={field.value}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <div>
                <div className="mb-6">
                  <h2 className="font-bold">Delivery Address</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Everywhere around Kasetsart University
                  </p>
                </div>
                <FormField
                  name="deliveryAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <div className="grid gap-2">
                        <Label htmlFor="deliveryAddress">Address</Label>
                        <Input placeholder="Address" type="text" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  )}
                />
              </div>

              <div>
                <h2 className="font-bold">Payment</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  All transactions are secure and encrypted.
                </p>
              </div>
              <FormField
                name="savedCard"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value=""
                        id="card"
                        className="peer sr-only"
                      />
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
                              {card.brand === "MasterCard" && (
                                <Icons.mastercard />
                              )}
                            </div>
                            <span>**** **** **** {card.last_digits}</span>
                          </Label>
                        </div>
                      ))
                    }
                  </RadioGroup>
                )}
              />

              {!form.getValues("savedCard") && (
                <>
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input
                          id="name"
                          placeholder="Cardholder Name"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  <FormField
                    name="cardNumber"
                    control={form.control}
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label htmlFor="number">Card number</Label>
                        <div className="relative">
                          <svg
                            className="absolute top-1/2 left-2 transform -translate-y-1/2"
                            {...getCardImageProps({ images } as any)}
                          />
                          <Input
                            className="pl-10"
                            {...getCardNumberProps({
                              onChange: field.onChange,
                            })}
                            value={field.value}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="expiryDate"
                      control={form.control}
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="year">Month / Year</Label>
                          <Input
                            {...getExpiryDateProps({
                              onChange: field.onChange,
                            })}
                            value={field.value}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                    <FormField
                      name="cvc"
                      control={form.control}
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            {...getCVCProps({ onChange: field.onChange })}
                            value={field.value}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                  {meta.isTouched && meta.error && (
                    <span className="text-sm text-red-600">{meta.error}</span>
                  )}
                  <FormField
                    name="save"
                    control={form.control}
                    render={({ field }) => (
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          id="save"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          // {...field}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="save"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Save this card for future purchases
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Securely save your card information for future
                            purchases.
                          </p>
                        </div>
                      </div>
                    )}
                  />
                </>
              )}
              <Button className="w-full" type="submit" disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Pay
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default CheckoutForm;
