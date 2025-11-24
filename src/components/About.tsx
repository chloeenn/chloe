import "./About.css";
import Lottie from "lottie-react";
import cubeWalk from "../assets/walking-cup.json";

function About() {
    return (
        <section className="about" id="about">
            <div className="about-wrap">
                {/* LEFT SIDE */}
                <div className="about-left">
                    {/* Heading */}
                    <header className="about-heading">
                        <h1 className="about-title">I’m Chloe</h1>
                    </header>

                    {/* ABOUT + GOALS SECTIONS */}
                    <div className="about-sections">
                        {/* ABOUT ME */}
                        <div className="about-block">
                            <p className="about-label">about me</p>
                            <div className="about-body">
                                <ul className="about-list">
                                    <li>
                                        A CS student working in Data &amp; AI. I like building small tools,
                                        organizing messy data, and understanding how things actually work under the hood.
                                    </li>
                                    <li>
                                        Most days I learn something new; on good days, I don’t break anything in the process.
                                    </li>

                                </ul>

                            </div>
                        </div>

                        {/* GOALS */}
                        <div className="about-block">
                            <p className="about-label">goals</p>
                            <div className="about-body">
                                <ul className="about-list">
                                    <li>
                                        Grow into data engineering — better pipelines, cleaner architecture, fewer mystery errors.
                                    </li>
                                    <li>
                                        Become a solid software engineer who understands systems deeply, not just “when it compiles.”
                                    </li>
                                    <li>
                                        Keep building things that matter and make someone’s day a bit easier.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE / ANIMATION */}
                <div className="about-right" aria-hidden="true">
                    <div className="about-blob about-blob-floating">
                        <Lottie animationData={cubeWalk} loop className="about-anim" />
                        <div className="about-bubble">my legs are tired</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
