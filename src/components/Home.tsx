import "./Home.css";
import Experience from "./Experience";
import Projects from "./Projects";

function Home() {
    return (
        <main className="home">
            <header className="home-header">
                <nav className="home-nav">
                    <button className="home-nav__item home-nav__item--active">
                        Home
                    </button>
                    <button className="home-nav-item">Experience</button>
                    <button className="home-nav-item">Projects</button>
                    <button className="home-nav-item">Contact</button>
                </nav>
            </header>

            {/* Intro */}
            <section className="home-hero">
                <h1>Hi, I'm Chloe ⏾</h1>
                <p className="home-text">I like building cool stuff.</p>
            </section>
            <Experience />
            <Projects/>
        </main>
    );
}

export default Home;
