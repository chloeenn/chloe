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
                        <h1 className="about-title">so, chloe</h1>
                    </header>

                    {/* ABOUT + GOALS SECTIONS */}
                    <div className="about-sections">
                        {/* ABOUT ME */}
                        <div className="about-block">
                            <p className="about-label">about me</p>
                            <div className="about-body">
                                <ul className="about-list">
                                    <li>
                                       I’m in my early 20s, studying Computer Science and working in Data <span className="amp-sentient">&amp;</span> AI.
                                    </li>
                                    <li>
                                        I’m still figuring things out, but I enjoy building small tools, cleaning messy data, and understanding how things actually work under the hood.
                                    </li>
                                    <li>
                                        Most days I learn something new; the rest I spend trying not to break anything important.
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
                                        Grow into data engineering, build cleaner architecture, and reduce mystery errors.
                                    </li>
                                    <li>
                                        Become a solid software engineer who understands systems deeply.
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
