import { useState } from "react";
import "./Experience.css";

type ExperienceFilter = "data" | "web" | "research" | null;

function Experience() {
    const [activeFilter, setActiveFilter] = useState<ExperienceFilter>(null);

    const getItemStateClass = (categories: ExperienceFilter[]) => {
        if (!activeFilter) return "";
        return categories.includes(activeFilter)
            ? "list-item--active"
            : "list-item--dim";
    };

    return (
        <section className="experience" aria-labelledby="experience-heading">
            <div className="experience-inner">
                <h1 id="experience-heading">Experience.</h1>

                {/* filter / focus strip */}
                <div className="experience-focus" aria-label="Experience focus">
                    <span className="focus-label">focus:</span>

                    <button
                        type="button"
                        className={`focus-tag ${activeFilter === "data" ? "focus-tag--active" : ""
                            }`}
                        onMouseEnter={() => setActiveFilter("data")}
                        onMouseLeave={() => setActiveFilter(null)}
                        onFocus={() => setActiveFilter("data")}
                        onBlur={() => setActiveFilter(null)}
                        aria-pressed={activeFilter === "data"}
                    >
                        data.
                    </button>

                    <button
                        type="button"
                        className={`focus-tag ${activeFilter === "web" ? "focus-tag--active" : ""
                            }`}
                        onMouseEnter={() => setActiveFilter("web")}
                        onMouseLeave={() => setActiveFilter(null)}
                        onFocus={() => setActiveFilter("web")}
                        onBlur={() => setActiveFilter(null)}
                        aria-pressed={activeFilter === "web"}
                    >
                        web.
                    </button>

                    <button
                        type="button"
                        className={`focus-tag ${activeFilter === "research" ? "focus-tag--active" : ""
                            }`}
                        onMouseEnter={() => setActiveFilter("research")}
                        onMouseLeave={() => setActiveFilter(null)}
                        onFocus={() => setActiveFilter("research")}
                        onBlur={() => setActiveFilter(null)}
                        aria-pressed={activeFilter === "research"}
                    >
                        research.
                    </button>
                </div>

                <ul className="list">
                    {/* DATA + RESEARCH */}
                    <li
                        className={`list-item ${getItemStateClass([
                            "data",
                        ])}`}
                    >
                        <div className="list-item-head">
                            <strong className="role">Enterprise Data <span className="amp-sentient">&amp;</span> AI Intern</strong>
                            <span className="date">09/25 - still here.</span>
                        </div>
                        <a
                            href="https://www.toronto.ca"
                            target="_blank"
                            rel="noreferrer"
                            className="company"
                        >
                            City of Toronto
                        </a>
                    </li>

                    {/* WEB */}
                    <li className={`list-item ${getItemStateClass(["web"])}`}>
                        <div className="list-item-head">
                            <strong className="role">Web Developer Intern</strong>
                            <span className="date">07/25 - 09/25</span>
                        </div>
                        <a
                            href="https://www.atlas-machinery.com"
                            target="_blank"
                            rel="noreferrer"
                            className="company"
                        >
                            Atlas Tools <span className="amp-sentient">&amp;</span> Machinery
                        </a>
                    </li>

                    {/* RESEARCH (+ DATA) */}
                    <li
                        className={`list-item ${getItemStateClass([
                            "research",
                            "data",
                        ])}`}
                    >
                        <div className="list-item-head">
                            <strong className="role">Research Assistant</strong>
                            <span className="date">05/25 - 08/25</span>
                        </div>
                        <a
                            href="https://lassonde.yorku.ca"
                            target="_blank"
                            rel="noreferrer"
                            className="company"
                        >
                            Lassonde School of Engineering – York University
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Experience;
