import type { Metadata } from "next";
import ReceiveAccess from "./ReceiveAccess";

export const metadata: Metadata = {
  title: "You're Almost In — Claim Your Free Access | EcomSimulation",
  description: "Your free program access is live. Our team is calling in the next 1-10 minutes — keep your phone close.",
};

export default async function ReceiveAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.name;
  const name = Array.isArray(raw) ? raw[0] : raw;
  return <ReceiveAccess name={name} />;
}
