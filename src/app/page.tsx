import AboutMe from "@/components/AboutMe";
import Contact from "@/components/ContactUs";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
   <div>
     <Hero/>
      <AboutMe />
      <Projects/>
      <Skills />
      <Contact/>
   </div>
  );
}
