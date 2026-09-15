"use client";

import { useState } from "react";
import styles from "./base44j.module.css";

const LINK = "https://re.aistorebuilder.com/base44-pricing?subid=ecomsimulation&sharedid=James";

export default function Base44JPage() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(LINK);
      } else {
        const ta = document.createElement("textarea");
        ta.value = LINK;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Could not copy automatically. Please select and copy manually: " + LINK);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <svg className={styles.logo} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="url(#g)" />
          <path d="M50 22 L74 78 L62 78 L50 48 L38 78 L26 78 Z" fill="#fff" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0b1830" />
              <stop offset="1" stopColor="#1b2b52" />
            </linearGradient>
          </defs>
        </svg>

        <h1 className={styles.h1}>Base44</h1>
        <p className={styles.sub}>Copy your link and open it in a private window.</p>

        <div className={styles.card}>
          <ul className={styles.steps}>
            <li>
              <span className={styles.num}>1</span>
              <span>
                <b>Tap Copy link</b> below.
              </span>
            </li>
            <li>
              <span className={styles.num}>2</span>
              <span>
                Open a new <b>private / incognito</b> window.
              </span>
            </li>
            <li>
              <span className={styles.num}>3</span>
              <span>
                <b>Paste</b> the link and complete your purchase.
              </span>
            </li>
          </ul>

          <div className={styles.urlBox}>{LINK}</div>

          <button
            className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
            onClick={copyLink}
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        <p className={styles.warning}>
          Don&apos;t just tap the link. Copy it and open it in a private/incognito window, otherwise your order may
          not be tracked.
        </p>
      </div>
    </div>
  );
}
