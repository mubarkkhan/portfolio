"use client";
import { CiDark, CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setScrolling, setScrollInto } from "../Toolkit/project_slice";
import { setTheme } from "../Toolkit/ThemeSlice";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state.proSlice.value);
  const theme = useSelector((state) => state.theme);
  const handleClick = (id) => {
    dispatch(setScrolling(true));
    dispatch(setScrollInto(id));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      dispatch(setScrolling(false));
    }, 1000);
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="bg-white dark:bg-gray-950 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {mounted && (
          <img
            src={theme === "dark" ? "Images/mdark1.png" : "Images/mlight.png"}
            alt="Logo"
            className="h-10 w-auto"
          />
        )}
      </div>
      <nav>
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 font-medium">
          <li
            onClick={() => handleClick("intro")}
            className={`hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
              sliceData?.scrollInto === "intro"
                ? "border-b-2 border-blue-600"
                : ""
            }`}
          >
            Intro
          </li>
          <li
            onClick={() => handleClick("project")}
            className={`hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
              sliceData?.scrollInto === "project"
                ? "border-b-2 border-blue-600"
                : ""
            }`}
          >
            Projects
          </li>
          <li
            onClick={() => handleClick("about")}
            className={`hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
              sliceData?.scrollInto === "about"
                ? "border-b-2 border-blue-600"
                : ""
            }`}
          >
            About
          </li>
          <li
            onClick={() => handleClick("contact")}
            className={`hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
              sliceData?.scrollInto === "contact"
                ? "border-b-2 border-blue-600"
                : ""
            }`}
          >
            Contact
          </li>
        </ul>
      </nav>
      <div className="flex space-x-4 items-center">
        {theme === "dark" ? (
          <button
            onClick={() => {
              dispatch(setTheme("light"));
            }}
            className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-transform duration-200 hover:scale-105"
          >
            <CiLight />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(setTheme("dark"));
            }}
            className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-transform duration-200 hover:scale-105"
          >
            <CiDark />
          </button>
        )}
      </div>
    </header>
  );
}
