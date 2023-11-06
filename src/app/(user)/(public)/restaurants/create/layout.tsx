import AuthLayout from "@/components/layouts/auth-layout";
import React from "react";

const CreateRestaurantLayout = ({ children }: { children: React.ReactNode }) => {
    return <AuthLayout>{children}</AuthLayout>;
};

export default CreateRestaurantLayout;