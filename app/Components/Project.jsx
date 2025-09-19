"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScrollInto } from "../Toolkit/project_slice";
import { handleGetAPI } from "../Utilities/Utils";
import socket from "../../Lib/socket";
import ProjectDetailModal from "./ProjectModal";

  const data = [
  {
    id: 1,
    title: "asapfly – Flight Booking Software",
    description:
      "A complete flight booking software with Amadeus API integration for live flight data, fare family details on the flight detail page, and Authorize.net for secure payment gateway.",
    fullDescription:
      "Developed an end-to-end flight booking software (except UI design) with Amadeus API for dynamic flights, Authorize.net for payments, and B2C, B2B, Staff, Admin portals.",
    technologies: [
      "React",
      "Redux",
      "Node.js",
      "Express",
      "MySQL",
      "Redis",
      "Amadeus API",
      "Authorize.net",
    ],
    imgurl: "/Images/asap.png",
    url: "https://asapfly.com",
    giturl: "",
    sections: [
      {
        title: "🔧 Frontend",
        color: "border-blue-600",
        content: "React, Redux",
      },
      {
        title: "⚙ Backend",
        color: "border-green-600",
        content: "Node.js, Express.js, Amadeus API, Authorize.net",
      },
      {
        title: "🗄 Database",
        color: "border-yellow-500",
        content: "MySQL, Redis",
      },
      {
        title: "🧩 Project Type",
        color: "border-purple-600",
        content:
          "Complete flight booking project with B2C, B2B, Staff, and Admin portals",
      },
      {
        title: "⚠ Problems Faced & Solutions",
        color: "border-red-500",
        isList: true,
        content: [
          "Complex Amadeus API integration → solved with custom middleware",
          "Role-based flows for B2C, B2B, staff, admin → solved with RBAC",
          "Real-time booking updates → implemented polling + server-side updates",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Hotel & Flight Booking Platform (UK Client)",
    description:
      "Developed a hotel and flight booking system with separate user and admin panels. Implemented all backend APIs, frontend logic, and admin features.",
    fullDescription:
      "This project was for a UK client where I handled backend APIs, business logic, and admin features. Another team member managed UI design.",
    technologies: ["React", "Node.js", "Express", "MySQL", "JWT"],
    imgurl: "/Images/hotel.jpg",
    url: "https://hotelbooking.example.com",
    giturl: "",
    sections: [
      {
        title: "🔧 Frontend",
        color: "border-blue-600",
        content: "React, Redux",
      },
      {
        title: "⚙ Backend",
        color: "border-green-600",
        content: "Node.js, Express.js, REST APIs",
      },
      {
        title: "🗄 Database",
        color: "border-yellow-500",
        content: "MySQL",
      },
      {
        title: "🧩 Contribution",
        color: "border-purple-600",
        content:
          "Implemented all backend APIs, business logic, and admin features",
      },
    ],
  },
];

export default function Project() {
  const sliceData = useSelector((state) => state.proSlice.value);
  const project = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sliceData?.isScrolling) {
          dispatch(setScrollInto("project")); // Update state when visible
        }
      },
      { threshold: 0.6 } // 60% of the section is visible
    );

    if (project.current) {
      observer.observe(project.current);
    }

    return () => {
      if (project.current) {
        observer.unobserve(project.current);
      }
    };
  }, [sliceData?.isScrolling]);
  useEffect(() => {
    if (sliceData?.scrollInto === "project" && project.current) {
      project.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sliceData]);
  return (
    <section
      ref={project}
      className="py-20 bg-gray-100 dark:bg-gray-900 text-center px-4 sm:px-6 lg:px-12"
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-16">
        My Projects
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((pr, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            {pr?.imgurl && (
              <img
                src={pr.imgurl}
                alt={pr.title || "Project Image"}
                className="w-full h-56 object-cover group-hover:opacity-80 transition duration-300"
              />
            )}

            {/* Content */}
            <div className="p-6 text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {pr?.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-base mb-3">
                {pr?.description}
              </p>

              {/* Technologies (supports comma-separated list) */}
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(pr?.technologies)
                  ? pr.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))
                  : pr?.technologies}
              </div>

              {/* Links */}
              <div className="flex justify-center flex-wrap gap-4 mt-6">
                <button
                  onClick={() => setSelectedProject(pr)}
                  className="bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition"
                >
                  📄 Overview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
