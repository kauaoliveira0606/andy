import type { Metadata } from "next";
import Script from "next/script";
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
  return (
    <>
      {/* Perf timing + preloads/dns-prefetch so the VTurb player starts as fast as possible. */}
      <Script id="vturb-perf-timing" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/players/6ab2b1a5d9072774a6ff8e2a/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/6ab2b195e5bf9eb8a6ba0a31/main.m3u8" as="fetch" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <ThankYouContent firstName={firstName} />
    </>
  );
}
