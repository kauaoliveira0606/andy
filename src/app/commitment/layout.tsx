import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commitment — EcomSimulation",
};

export default function CommitmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
