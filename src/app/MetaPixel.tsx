"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const META_PIXEL_ID = "1467520008555084";

/* Routes that must load NO Meta Pixel at all. */
const EXCLUDED = new Set(["/thank-you-nq"]);

/* Routes that load the pixel but fire a different standard event instead
   of PageView. Anything not listed fires PageView. */
const EVENT_BY_PATH: Record<string, string> = {
  "/receiveaccess": "Lead",
};

export default function MetaPixel() {
  const pathname = usePathname();
  if (EXCLUDED.has(pathname)) return null;

  const event = EVENT_BY_PATH[pathname] ?? "PageView";

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', '${event}');
`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=${event}&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
