import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import flags from "react-phone-number-input/flags";
import Input, {
  Country,
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

interface PhoneNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: any;
  value: string;
}

const PhoneNumberInput = ({
  onChange,
  value,
  className,
  ...props
}: PhoneNumberInputProps) => {
  const CountrySelect = ({
    value,
    onChange,
    labels,
    ...rest
  }: {
    value: Country;
    onChange: any;
    labels: en;
  }) => (
    <div className="relative hover:bg-secondary rounded-l-lg h-full w-16">
      <div className="w-12 absolute top-1/2 left-2 transform -translate-y-1/2 ml-1 flex gap-1 items-center rounded-lg">
        {flags[value]!({ title: value })}
        <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </div>
      <select
        id="country"
        {...rest}
        value={value}
        onChange={(event) => onChange(event.target.value || undefined)}
        className="opacity-0 w-16"
      >
        <option value="">{labels["ZZ"]}</option>
        {getCountries().map((country) => (
          <option key={country} value={country}>
            {labels[country]} +{getCountryCallingCode(country)}
          </option>
        ))}
      </select>
    </div>
  );

  const [country, setCountry] = useState<Country>("TH");

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center w-12">
        <CountrySelect labels={en} value={country} onChange={setCountry} />
      </div>
      <Input
        onChange={onChange}
        country={country}
        international
        withCountryCallingCode
        value={value}
        className={cn(
          "pl-16 flex h-10 w-full rounded-md border border-input bg-background pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default PhoneNumberInput;
