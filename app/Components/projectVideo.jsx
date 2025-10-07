"use client";

import { useDispatch } from "react-redux";
import { setScrolling, setScrollInto } from "../Toolkit/project_slice";

export default function ProjectDemo() {
    const dispatch = useDispatch();
    const handleClick = (id) => {
    dispatch(setScrolling(true));
    dispatch(setScrollInto(id));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      dispatch(setScrolling(false));
    }, 1000);
  };
  return (
    <section className="py-20 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-4">ASAPFly – Flight Booking Software</h2>
    <p className="text-gray-700 dark:text-gray-300 mb-6">
      A complete flight booking platform built using Amadeus API. Search, book, and manage flights in real-time.
    </p>

    {/* Tech Stack */}
    <div className="flex justify-center gap-4 flex-wrap mb-8">
      <span className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-full text-sm font-medium">React.js</span>
      <span className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-full text-sm font-medium">Node.js</span>
      <span className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-full text-sm font-medium">MySQL</span>
      <span className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-full text-sm font-medium">Amadeus API</span>
    </div>

    {/* Video */}
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      <video
        controls
        className="w-full rounded-lg shadow-lg dark:grayscale"
        poster="/videos/video-poster.png"
      >
        <source src="/video/asapfly1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    {/* CTA */}
    <div>
      <a
        onClick={() => handleClick("contact")}
        className="inline-block px-8 py-3 bg-white dark:bg-gray-800 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition cursor-pointer"
      >
        Hire Me / Collaborate
      </a>
    </div>
  </div>
</section>

  );
}
