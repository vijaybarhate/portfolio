import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import LoadingScreen from "./components/ui/LoadingScreen";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Certifications from "./components/sections/Certifications";
import Stats from "./components/sections/Stats";
import Contact from "./components/sections/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-bg text-text-primary min-h-screen font-body selection:bg-accent/30 selection:text-text-primary">
      <AnimatePresence>
        {isLoading ? <LoadingScreen onComplete={() => setIsLoading(false)} /> : null}
      </AnimatePresence>

      {!isLoading ? (
        <>
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <Certifications />
            <Stats />
            <div id="resume">
              <Contact />
            </div>
          </main>
        </>
      ) : null}
    </div>
  );
}

export default App;
