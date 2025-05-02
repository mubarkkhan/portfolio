'use client'
import AboutMe from "./Components/About";
import ChatBox from "./Components/ChatBox";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Intro from "./Components/Intro";
import Navbar from "./Components/Navbar";
import Project from "./Components/Project";
import useSmoothScroll from "./Service/helper";

export default function Home() {
  useSmoothScroll();
  return (
    <>
      <ChatBox/>
      <Navbar/>
      <Intro />
      <Project />
      <AboutMe/>
      <Contact />
      <Footer/>
    </>
  );
}
