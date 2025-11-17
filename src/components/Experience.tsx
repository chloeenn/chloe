import "./Experience.css";

function Experience() {
    return (
        <section className="experience" aria-labelledby="experience-heading">
            <div className="experience-inner">
                <h1>Experience.</h1>
                <ul className="list">
                    <li className="list-item">
                        <div className="list-item-head">
                            <strong className="role">Enterprise Data & AI Intern</strong>
                            <span className="date">09/25 - still here.</span>
                        </div>
                        <a href="https://www.toronto.ca" target="_blank" className="company">City of Toronto</a>
                    </li>

                    <li className="list-item">
                        <div className="list-item-head">
                            <strong className="role">Web Developer Intern</strong>
                            <span className="date">07/25 - 09/25</span>
                        </div>
                        <a href="https://www.atlas-machinery.com" target="_blank" className="company">Atlas Tools & Machinery</a>
                    </li>

                    <li className="list-item">
                        <div className="list-item-head">
                            <strong className="role">Research Assistant</strong>
                            <span className="date">05/25 - 08/25</span>
                        </div>
                        <a href="https://lassonde.yorku.ca" target="_blank" className="company">Lassonde School of Engineering - York University</a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Experience;