import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "The EcomSimulation Guide",
  description:
    "Your complete guide to the EcomSimulation mentorship. Read it before your call so we can skip the basics and spend the time on your situation.",
};

export default function GuidePage() {
  return <GuideContent />;
}
