"use client";
import { FaNodeJs, FaReact } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { SiSocketdotio } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setScrolling, setScrollInto } from "../Toolkit/project_slice";
import { Typewriter } from "react-simple-typewriter";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function Intro() {
  const sliceData = useSelector((state) => state.proSlice.value);
  const introRef = useRef(null);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(setScrolling(true));
    dispatch(setScrollInto(id));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      dispatch(setScrolling(false));
    }, 1000);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sliceData?.isScrolling) {
          dispatch(setScrollInto("intro"));
        }
      },
      { threshold: 0.6 }
    );

    const currentRef = introRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [sliceData?.isScrolling, dispatch]);

  useEffect(() => {
    if (sliceData?.scrollInto === "intro" && introRef.current) {
      introRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sliceData]);

  const StatCard = ({ label, end, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center"
    >
      <div className={`text-4xl font-bold ${color}`}>
        <CountUp end={end} duration={2} />+
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{label}</p>
    </motion.div>
  );

  return (
    // <section
    //     ref={introRef}
    //     className="bg-gray-100 dark:bg-gray-900 py-20 flex flex-col items-center text-center px-6 transition-colors duration-300"
    // >
    //     <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
    //         Hi, I'm Mubark Khan
    //     </h1>
    //     <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
    //         <Typewriter
    //             words={[
    //                 "React.js Developer 🚀",
    //                 "UI Enthusiast 💻",
    //                 "Code. Create. Deliver. ✅",
    //             ]}
    //             loop={true}
    //             cursor
    //             cursorStyle="_"
    //             typeSpeed={70}
    //             deleteSpeed={50}
    //             delaySpeed={1500}
    //         />
    //     </p>

    //     {/* Animated Counters */}
    //     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full max-w-4xl">
    //         <StatCard label="Projects Completed" end={15} color="text-blue-600" />
    //         <StatCard label="Happy Clients" end={10} color="text-yellow-500" />
    //         <StatCard label="Technologies Used" end={8} color="text-green-500" />
    //     </div>
    //     {/* <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
    //         A passionate React.js developer crafting high-performance and user-friendly applications.
    //     </p>
    //     <div className="flex gap-4 mb-6">
    //         <a
    //             onClick={() =>handleClick("project")}
    //             className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
    //         >
    //             🚀 View My Work
    //         </a>
    //         <a
    //             onClick={() =>handleClick("contact")}
    //             className="bg-gray-800 cursor-pointer dark:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-900 transition"
    //         >
    //             📩 Contact Me
    //         </a>
    //     </div> */}
    //     <ul className="flex gap-6 text-3xl text-gray-700 dark:text-gray-300">
    //         <li className="w-10 h-10"><FaReact /></li>
    //         <li className="w-10 h-10"><RiNextjsFill /></li>
    //         <li className="w-10 h-10"><FaNodeJs /></li>
    //         <li className="w-10 h-10"><GrMysql /></li>
    //     </ul>
    // </section>
    <section
      ref={introRef}
      className="relative bg-gray-100 dark:bg-gray-900 py-24 flex flex-col items-center text-center px-6 overflow-hidden"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-300/10 to-pink-300/20 blur-3xl opacity-30 -z-10 animate-pulse"></div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
      >
        Hi, I'm Mubark Khan
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-10"
      >
        <Typewriter
          words={[
            "Full Stack Developer | React.js & Node.js 🚀",
            "Frontend-focused, Backend-ready — end-to-end delivery 🔁",
            "Crafting scalable apps with clean code & fast UX 💡",
            "Passionate about sleek UI and secure APIs ⚛️",
            "Code. Collaborate. Create. ✨",
          ]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.p>

      {/* Animated Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
        <StatCard label="Projects Completed" end={2} color="text-blue-600" />
        <StatCard label="Happy Clients" end={2} color="text-yellow-500" />
        <StatCard label="Technologies Used" end={4} color="text-green-500" />
      </div>
      {/* <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-6 text-4xl text-gray-700 dark:text-gray-300"
        >
            <li className="hover:scale-110 transition-transform duration-300"><FaReact /></li>
            <li className="hover:scale-110 transition-transform duration-300"><RiNextjsFill /></li>
            <li className="hover:scale-110 transition-transform duration-300"><FaNodeJs /></li>
                <li className="hover:scale-110 transition-transform duration-300"><GrMysql /></li>
                <li className="hover:scale-110 transition-transform duration-300"> <SiSocketdotio /></li>
               
        </motion.ul> */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="flex gap-6 text-4xl text-gray-700 dark:text-gray-300"
      >
        {[FaReact, RiNextjsFill, FaNodeJs, GrMysql, SiSocketdotio].map(
          (Icon, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                },
              }}
              whileHover={{
                scale: 1.15,
                y: -4,
                transition: { type: "spring", stiffness: 200 },
              }}
              className="transition-transform duration-300 cursor-pointer"
            >
              <Icon />
            </motion.li>
          )
        )}
      </motion.ul>
    </section>
  );
}
