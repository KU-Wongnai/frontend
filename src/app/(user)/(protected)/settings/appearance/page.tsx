import React from "react";
import ApperenceForm from "./appearence-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ApperencePage = () => {
  return (
    <div className="w-full max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appearance</CardTitle>
          <CardDescription>
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApperenceForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApperencePage;
