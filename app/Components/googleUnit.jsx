import Script from "next/script";

export default function AdUnit() {
  return (
     <Script
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2606365238590751"
      crossorigin="anonymous"
      async
    />
  );
}
