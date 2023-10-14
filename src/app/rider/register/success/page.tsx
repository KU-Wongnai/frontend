"use client";

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const RiderRegisterSucceed = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-4 py-12 min-h-screen">
      <Check className="bg-primary text-white h-14 w-14 rounded-full" />
      <div>Register Rider Succeed</div>
      <div className="text-sm text-gray-500">Wait for admin to approve your account</div>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}

export default RiderRegisterSucceed