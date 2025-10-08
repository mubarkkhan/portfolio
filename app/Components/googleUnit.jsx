import Script from "next/script";

export default function AdUnit() {
  return (
     <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-2606365238590751"
      />
  );
}
