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
  {project?.sections?.map((section, idx) => (
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
