'use client'

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScrollInto } from "../Toolkit/project_slice";
import { handleGetAPI } from "../Utilities/Utils";
import socket from '../../Lib/socket';

export default function Project() {
    const sliceData = useSelector((state) => state.proSlice.value)
    const project = useRef(null)
    const [projectData, setProjectData] = useState([]);
    const dispatch = useDispatch();
    const fetchData = async () => {
        try {
          const result = await handleGetAPI('admin/getProject')
          if (result.data.status === true) {
            setProjectData(result.data.result)
          }
        } catch (e) {
          console.log(e,'error')
        }
      }
    useEffect(() => {
        socket.on('sendProject', (data) => {
              setProjectData((prev)=>[...prev, data])
        })
        socket.on('sendEditProject', (data) => {
            setProjectData((prev) => 
                prev?.map((pr) =>
                    String(pr?.id) === String(data?.id) ? {...pr, ...data} : pr
                )
            )
        })
        socket.on('deleteProject', (id) => {
            setProjectData((prev) => prev?.filter((k) => Number(k?.id) !== Number(id)));
        })
        fetchData();
        return () => {
            socket.off('sendProject');
            socket.off('sendEditProject');
            socket.off('deleteProject');
        };
      }, [])
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
            project.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [sliceData])
    return (
        <section
  ref={project}
  className="py-20 bg-gray-100 dark:bg-gray-900 text-center px-4 sm:px-6 lg:px-12"
>
  <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-16">
    My Projects
  </h2>

  <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
    {projectData?.map((pr, index) => (
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
            {pr?.technologies}
          </div>

          {/* Links */}
          <div className="flex justify-center flex-wrap gap-4 mt-6">
            {pr?.url && (
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
              >
                🌐 Live Site
              </a>
            )}
            {pr?.giturl && (
              <a
                href={pr.giturl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 dark:bg-gray-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition"
              >
                🔗 GitHub Code
              </a>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

    );
}