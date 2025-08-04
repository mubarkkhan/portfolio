'use client'

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setScrollInto } from "../Toolkit/project_slice"

export default function AboutMe() {
    const sliceData = useSelector((state) => state.proSlice.value)
    const aboutRef = useRef(null)
    const dispatch = useDispatch();
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !sliceData?.isScrolling) {
                    dispatch(setScrollInto("about")); // Update state when visible
                }
            },
            { threshold: 0.6 } // 60% of the section is visible
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, [sliceData?.isScrolling]);
    useEffect(() => {
        if (sliceData?.scrollInto === "about" && aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [sliceData])
    return (
        <section ref={aboutRef} className="py-20 bg-white dark:bg-gray-900 text-center px-6">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-10">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                Full-Stack Developer with 1 year 3 months of experience building scalable flight and hotel booking platforms using React.js, Node.js, and MySQL. Proficient in developing B2C, B2B, and Admin panels with a strong focus on responsive UI, secure JWT-based authentication, seamless API integration, and performance optimization. Recognized for problem-solving skills, clean code practices, and collaborative team mindset with attention to UI/UX design.
            </p>
            
            {/* <div className="mt-12 max-w-4xl mx-auto">
                <div className="relative border-l-4 border-blue-500 pl-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Stack Developer at Teamindiawebdesign</h3>
                        <p className="text-gray-600 dark:text-gray-300">Developed full-scale flight and hotel booking platforms for B2C and B2B users. Created responsive and user-friendly UIs using React.js, implemented secure authentication flows, and integrated third-party APIs. Also contributed to admin and agent dashboards with dynamic data handling and performance-focused design.</p>
                        <span className="text-sm text-gray-400">2024 - Present</span>
                    </div>
                    
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Frontend Developer Course</h3>
                        <p className="text-gray-600 dark:text-gray-300">Completed an intensive 6-month course on modern web technologies like HTML5, CSS3, JavaScript and React.js.</p>
                        <span className="text-sm text-gray-400">2023</span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">BSc in Mathematics</h3>
                        <p className="text-gray-600 dark:text-gray-300">Completed my bachelor's degree, sharpening my analytical and problem-solving skills.</p>
                        <span className="text-sm text-gray-400">2021 - 2024</span>
                    </div>
                </div>
            </div> */}
            <div className="mt-12 max-w-4xl mx-auto">
  <div className="relative border-l-4 border-blue-500 pl-6 space-y-12">

    {/* Full Stack Developer */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Full Stack Developer at Teamindiawebdesign
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
       Developed end-to-end flight and hotel booking platforms for B2C and B2B users, including agent and admin dashboards. Built responsive, user-centric UIs using React.js and managed frontend logic with Redux. Integrated third-party APIs and implemented secure JWT-based authentication. Contributed to dynamic data handling, role-based access control, and optimized performance across the platform.
      </p>
      <span className="text-sm text-gray-400 block mt-2">April 2024 - Present</span>
    </div>

    {/* Frontend Developer Course */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Frontend Developer Course
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Completed an intensive 6-month course on modern web technologies like HTML5, CSS3, JavaScript and React.js.
      </p>
      <span className="text-sm text-gray-400 block mt-2">2023</span>
    </div>

    {/* BSc in Mathematics */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        BSc in Mathematics
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Completed my bachelor's degree, sharpening my analytical and problem-solving skills.
      </p>
      <span className="text-sm text-gray-400 block mt-2">2021 - 2024</span>
    </div>

  </div>
</div>

            <div className="mt-10">
                <a href="/PDF/Mubark_Khan_Full_Stack_Developer.pdf" download className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition dark:hover:bg-blue-500">
                    📄 Download Resume
                </a>
            </div>
        </section>
    );
}
