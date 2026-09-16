import type { Metadata } from "next";
import Script from "next/script";
import FreeStore from "./FreeStore";

export const metadata: Metadata = {
  title: "Build a Successful E-commerce Business.",
  description:
    "Your store is built by AI in about 10 minutes and our team calls you to set the whole thing up. No experience or tech skills needed.",
};

export default function FreeStorePage() {
  return (
    <>
      {/* Perf timing + preloads/dns-prefetch so the VTurb player starts as fast as possible. */}
      <Script id="vturb-perf-timing" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/players/6a82401f5db7a2bc312f50d8/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/6a823fbb54706aa2b3add2c6/main.m3u8" as="fetch" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <FreeStore />
    </>
  );
}
