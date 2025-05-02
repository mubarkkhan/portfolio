"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../Toolkit/ThemeSlice";

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme); // Ensure lowercase "theme"
  const dispatch = useDispatch();

  // Load theme from localStorage when component mounts
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);

  // Apply theme class to <html> tag & save to localStorage
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme); // Store theme in localStorage
    }
  }, [theme]);

  return <>{children}</>;
}
