import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base44",
};

export default function Base44JLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
