import "./About.css";
import Lottie from "lottie-react";
import cubeWalk from "../assets/walking-cup.json";

function About() {
    return (
        <section className="about" id="about">
            <div className="about-wrap">
                {/* LEFT TEXT */}
                <div className="about-left">
                    <p className="about-eyebrow">about me.</p>

                    <h1 className="about-title">
                        I’m Chloe
                    </h1>
                    <p className="about-text">
                        I build pipelines, automate the repetitive parts, and design straightforward interfaces.
                    </p>

                    <p className="about-text">
                        I’m early in my career, so most of my job is learning quickly and fixing what I learned slowly.
                    </p>
                </div>

                {/* RIGHT ANIMATION */}
                <div className="about-right" aria-hidden="true">
                    <div className="about-blob">
                        <Lottie animationData={cubeWalk} loop className="about-anim" />
                        <div className="about-bubble">my legs are tired </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
