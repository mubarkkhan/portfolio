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
                I'm Mubark Khan, a passionate Full Stack Developer with expertise in React, Next.js, Node.js, and MySQL. 
                With over 8 months of professional experience in web development, I specialize in building dynamic, high-performance applications.
                My journey started with a strong foundation in Mathematics, which enhances my logical problem-solving skills.
            </p>
            
            <div className="mt-12 max-w-4xl mx-auto">
                <div className="relative border-l-4 border-blue-500 pl-6">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">BSc in Mathematics</h3>
                        <p className="text-gray-600 dark:text-gray-300">Completed my bachelor's degree, sharpening my analytical and problem-solving skills.</p>
                        <span className="text-sm text-gray-400">2021 - 2024</span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Stack Developer Course</h3>
                        <p className="text-gray-600 dark:text-gray-300">Completed an intensive 8-month course on modern web technologies like React, Node.js, and MySQL.</p>
                        <span className="text-sm text-gray-400">2023</span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Internship at TeamXML</h3>
                        <p className="text-gray-600 dark:text-gray-300">Worked on a flight and hotel booking website, gaining hands-on experience in real-world projects.</p>
                        <span className="text-sm text-gray-400">2023 - 2024</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">React Developer at Current Company</h3>
                        <p className="text-gray-600 dark:text-gray-300">Developing B2C websites and e-commerce platforms, specializing in user-friendly UI/UX and optimized performance.</p>
                        <span className="text-sm text-gray-400">2024 - Present</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-10">
                <a href="/PDF/resume.pdf" download className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition dark:hover:bg-blue-500">
                    📄 Download Resume
                </a>
            </div>
        </section>
    );
}
