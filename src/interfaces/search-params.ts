import { PRICE } from "./price";

export interface SearchParams {
  name?: string;
  type?: string;
  // price?: PRICE;
  location?: string;
}
