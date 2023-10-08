// hash by use random and not duplicate each time
import { randomBytes } from "crypto";

export function hash(text: string) {
  return randomBytes(8).toString("hex");
}