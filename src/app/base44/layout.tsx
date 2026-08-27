import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base44",
};

export default function Base44Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
