import type { Metadata } from "next";
import Script from "next/script";
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
  return (
    <>
      {/* Perf timing + preloads/dns-prefetch so the hero VTurb player starts as fast as possible. */}
      <Script id="vturb-perf-timing" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/players/6a823fba5db7a2bc312f5081/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/6a823f54284fbb2172cd65cc/main.m3u8" as="fetch" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <ReceiveAccess name={name} />
    </>
  );
}
