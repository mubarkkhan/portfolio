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
    title: "Flight Booking Website",
    description:
      "A responsive flight and hotel booking platform with real-time search, filters, and payment integration.",
    technologies: ["React", "Node.js", "Express", "MySQL", "JWT"],
    imgurl: "/images/flightPro.avif",
    url: "https://flightbooking.example.com",
    giturl: "",
  },
  {
    id: 2,
    title: "Hotel & Flight Booking Platform (UK Client)",
    description:
      "Developed a hotel and flight booking system with separate user and admin panels. Implemented all backend APIs, frontend logic, and admin features. UI design was handled by another team member.",
    technologies: ["React", "Node.js", "Express", "MySQL", "JWT"],
    imgurl: "/images/fh2.jpg", // You can change this image path as needed
    url: "https://hotelbooking.example.com", // Add real URL or leave blank
    giturl: "", // Private project, so leave empty or "#"
  }
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
              {/* <div className="flex justify-center flex-wrap gap-4 mt-6">
                <button
                  onClick={() => setSelectedProject(pr)}
                  className="bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition"
                >
                  📄 Overview
                </button>
              </div> */}
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
