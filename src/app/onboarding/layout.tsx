import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome — EcomSimulation",
  description: "You're in. Follow the steps below to get fully set up inside EcomSimulation.",
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
