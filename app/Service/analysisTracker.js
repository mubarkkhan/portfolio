'use client';
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtag('config', 'G-47D0RWH4TS', { page_path: pathname });
  }, [pathname]);

  return null;
}
