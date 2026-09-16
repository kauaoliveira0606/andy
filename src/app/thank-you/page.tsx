import type { Metadata } from "next";
import ThankYouContent from "./ThankYouContent";

/* This page shares all its content with /thank-you-nq via ./ThankYouContent.
   Edit ThankYouContent.tsx to change both pages at once. */

export const metadata: Metadata = {
  title: "EcomSimulation — You're Almost In",
  description: "One step left to confirm your call. Reply to the email in your inbox and watch the video below before your call.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.first_name;
  const firstName = Array.isArray(raw) ? raw[0] : raw;
  return <ThankYouContent firstName={firstName} />;
}
