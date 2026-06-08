import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import { About } from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certifications from "./components/sections/Certifications";
import Stats from "./components/sections/Stats";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <div className="bg-bg text-text-primary min-h-screen font-body selection:bg-accent/30 selection:text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Certifications />
        <div id="resume">
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
