import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
});

interface CurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | number;
}

const Currency = ({ value, ...props }: CurrencyProps) => {
  return <span {...props}>{formatter.format(Number(value))}</span>;
};

export default Currency;
