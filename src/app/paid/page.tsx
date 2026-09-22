import type { Metadata } from "next";
import Script from "next/script";
import Paid from "./Paid";

export const metadata: Metadata = {
  title: "Build a Successful E-commerce Business.",
  description:
    "Your store is built by AI in about 10 minutes and our team calls you to set the whole thing up. No experience or tech skills needed.",
};

export default function PaidPage() {
  return (
    <>
      {/* Perf timing + preloads/dns-prefetch so the VTurb player starts as fast as possible. */}
      <Script id="vturb-perf-timing" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/players/6ab2b1b34ebd21688da54a8c/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/a75d7c73-f0c0-4135-93ad-4b36c0f4d6f6/6ab2b1a6c32115b91d564c96/main.m3u8" as="fetch" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <Paid />
    </>
  );
}
