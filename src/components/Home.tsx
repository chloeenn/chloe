import "./Home.css";
import Navbar from "../components/Navbar";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import HeroArt from "./HeroArt";
import HeroSolar from "./HeroSolar";
// import HeroGeometric from "./HeroGeometric";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        {/* HERO */}
        <section id="hero" className="home-section home-hero">
          {/* <h1>Hi, I&apos;m Chloe 🌙</h1> */}
          {/* <p className="home-text">I like building cool, intentional things.</p> */}
        {/* <HeroArt/> */}
        <HeroSolar/>
        </section>
        

        {/* ABOUT */}
        <section id="about" className="home-section home-about">
          <div className="home-about__content">
            <h2>About me</h2>
            <p>
              I&apos;m a Computer Science student at York University and an
              Enterprise Data &amp; AI intern at the City of Toronto. I build
              clean and practical tools – AI agents, internal systems, and UX
              experiences that feel simple and calm.
            </p>
            <p>
              I focus on clarity, human-centered design, and making complex
              ideas easy to use for real teams. My work sits between data, UI,
              and people.
            </p>
            <p>
              Recently, I&apos;ve been exploring agentic AI workflows,
              lightweight internal tooling, and minimal digital interfaces.
            </p>
          </div>
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
          <h2>Let&apos;s connect</h2>
          <p>Email: chloenguyen@…</p>
        </section>
      </main>
    </>
  );
}

export default Home;
