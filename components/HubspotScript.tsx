"use client";

import Script from "next/script";

export default function HubspotScript() {
  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src="//js-eu1.hs-scripts.com/147635562.js"
      onLoad={() => {
        console.log("HubSpot script loaded");
      }}
      onError={(e) => {
        console.error("HubSpot script failed to load", e);
      }}
    />
  );
}