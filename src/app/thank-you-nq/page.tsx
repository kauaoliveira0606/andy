import type { Metadata } from "next";
import ThankYouContent from "../thank-you/ThankYouContent";

/* Queue redirect target. Shares all its content with /thank-you via
   ../thank-you/ThankYouContent. Edit ThankYouContent.tsx to change both
   pages at once — do NOT fork the markup here. */

export const metadata: Metadata = {
  title: "EcomSimulation — You're Almost In",
  description: "One step left to confirm your call. Reply to the email in your inbox and watch the video below before your call.",
};

export default function ThankYouNqPage() {
  return <ThankYouContent />;
}
