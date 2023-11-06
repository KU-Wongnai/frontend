"use client"

import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import MyRestaurantList from "@/app/(user)/(protected)/merchant/restaurants/components/my-restaurant-list";

type Props = {}

export default function RestaurantHome({}: Props) {
  return (
      <section className="container mx-auto pb-6 px-4 sm:px-0 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>My Restaurant</CardTitle>
          </CardHeader>
          <CardContent>
            <MyRestaurantList />
          </CardContent>
        </Card>
      </section>
  )
}