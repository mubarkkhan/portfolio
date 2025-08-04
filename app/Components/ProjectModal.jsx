import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <motion.div
        onWheel={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl shadow-xl p-8 max-h-[90vh] overflow-y-auto custom-scroll"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:hover:text-white text-3xl transition duration-200"
        >
          &times;
        </button>

        {/* Title */}
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {project.fullDescription}
        </p>

        {/* Content Sections */}
        <div className="space-y-6 text-left">
          {[
            {
              title: "🔧 Frontend",
              color: "border-blue-600",
              content: "React, Redux, Sass CSS",
            },
            {
              title: "⚙ Backend",
              color: "border-green-600",
              content: "Node.js, Express.js, REST API, Amadeus integration",
            },
            {
              title: "🗄 Database",
              color: "border-yellow-500",
              content: "MySQL",
            },
            {
              title: "🧩 Project Type",
              color: "border-purple-600",
              content:
                "Complete flight booking project with B2C, B2B, Staff, and Admin portals",
            },
            {
              title: "📝 Client Testimonial",
              color: "border-pink-500",
              content:
                "“Very happy with the end product. User-friendly, fast and complete solution for flight booking.”",
              italic: true,
            },
            {
              title: "⚠ Problems Faced & Solutions",
              color: "border-red-500",
              isList: true,
              content: [
                "Complex integration with Amadeus API – solved by studying docs deeply & writing custom middleware",
                "Maintaining separate flows for B2C, B2B, staff & admin – solved by role-based access control",
                "Real-time booking updates – implemented with polling and server-side updates",
              ],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h4
                className={`text-lg font-semibold text-gray-900 dark:text-white mb-1 border-l-4 ${section.color} pl-2`}
              >
                {section.title}
              </h4>
              {section.isList ? (
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p
                  className={`text-gray-700 dark:text-gray-300 ${
                    section.italic ? "italic" : ""
                  }`}
                >
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Live Link */}
        {project?.url && (
          <div className="mt-8 text-center">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-200"
            >
              🌐 Visit Live Site
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
