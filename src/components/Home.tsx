import "./Home.css";
import Navbar from "../components/Navbar";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import HeroSolar from "./HeroSolar";
import About from "./About";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        {/* HERO */}
        <section id="hero" className="home-section home-hero">
        <HeroSolar/>
        </section>
        

        {/* ABOUT */}
        <section id="about" className="home-section home-about">
          <div className="home-about__content">
            
            
          </div>
          <About/>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="home-section">
          <Experience />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="home-section">
          <Projects />
        </section>

        {/* CONTACT */}
        <section id="contact" className="home-section home-contact">
          <h2>Let&apos;s connect!</h2>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/chloeenn/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span>·</span>
            <a href="https://github.com/chloeenn" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span>·</span>
            <a href="mailto:gn.chloe1@gmail.com">Email</a>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
