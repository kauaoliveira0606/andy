import type { Metadata } from "next";
import FreeStore from "./FreeStore";

export const metadata: Metadata = {
  title: "Claim Your Free AI-Built Store + Free Program — EcomSimulation",
  description:
    "Your store is built by AI in about 10 minutes and our team calls you to set the whole thing up. No experience or tech skills needed.",
};

export default function FreeStorePage() {
  return <FreeStore />;
}
