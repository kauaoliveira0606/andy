import type { Metadata } from "next";
import ThankYouContent from "../thank-you/ThankYouContent";

/* Queue redirect target. Shares all its content with /thank-you via
   ../thank-you/ThankYouContent. Edit ThankYouContent.tsx to change both
   pages at once — do NOT fork the markup here.
   The one intentional difference: this page fires NO Meta Pixel events
   (firePixel={false} here, and the root layout skips PageView for /thank-you-nq). */

export const metadata: Metadata = {
  title: "EcomSimulation — You're Almost In",
  description: "One step left to confirm your call. Reply to the email in your inbox and watch the video below before your call.",
};

export default function ThankYouNqPage() {
  return <ThankYouContent firePixel={false} />;
}
