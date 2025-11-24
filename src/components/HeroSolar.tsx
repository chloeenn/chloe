// HeroSolar.tsx
import React, { useState } from "react";
import "./HeroSolar.css";

type PlanetId = "ai" | "frontend" | "playground";

const PLANET_LABELS: Record<PlanetId, string> = {
  ai: "Productive things",
  frontend: "Pretty things",
  playground: "Chaotic things",
};

const PLANET_DESCRIPTIONS: Record<PlanetId, string> = {
  ai: "Tools that get things done.",
  frontend: "Screens that don’t yell at your eyes.",
  playground: "Ideas I built after saying ‘what if…’ at 2AM.",
};

const HeroSolar: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<PlanetId | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    const factor = 14;
    setTilt({ x: dx * factor, y: dy * factor });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handlePlanetEnter = (id: PlanetId) => setActive(id);
  const handlePlanetLeave = () => setActive(null);
  const handlePlanetClick = (id: PlanetId) =>
    setActive((prev) => (prev === id ? null : id));

  return (
    <div
      className="hero-solar"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* top-left label */}
      <div className="hero-solar-tag">
        {/* <span className="hero-solar-dot" />
        <span>Computer Science at York University</span> */}
        <aside>
          <span className="hero-solar-dot" />
        <p className="current-label">Education</p>
        <p className="current-line">
          Computer Science @ York University
        </p>
      </aside>
      </div>

      {/* solar system */}
      <div
        className="hero-solar-system"
        style={{
          transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
        }}
      >
        <div className="orbit orbit--outer">
          <button
            className="planet planet--one"
            onMouseEnter={() => handlePlanetEnter("ai")}
            onMouseLeave={handlePlanetLeave}
            onClick={() => handlePlanetClick("ai")}
            aria-label="AI & data systems"
          />
        </div>

        <div className="orbit orbit--middle">
          <button
            className="planet planet--two"
            onMouseEnter={() => handlePlanetEnter("frontend")}
            onMouseLeave={handlePlanetLeave}
            onClick={() => handlePlanetClick("frontend")}
            aria-label="Interfaces & UX"
          />
        </div>

        <div className="orbit orbit--inner">
          <button
            className="planet planet--three"
            onMouseEnter={() => handlePlanetEnter("playground")}
            onMouseLeave={handlePlanetLeave}
            onClick={() => handlePlanetClick("playground")}
            aria-label="Experiments & little tools"
          />
        </div>

        <span className="solar-star solar-star--one" />
        <span className="solar-star solar-star--two" />
        <span className="solar-star solar-star--three" />
        
        {/* center text - moved inside the solar system so it stays centered with the orbits */}
        <div className="hero-solar-center">
          <h1>chloe</h1>
        </div>
      </div>

      {/* bottom info pill */}
      <div className="hero-solar-panel">
        {active ? (
          <>
            <div className="panel-label">{PLANET_LABELS[active]}</div>
            <div className="panel-desc">{PLANET_DESCRIPTIONS[active]}</div>
          </>
        ) : (
          <>
            <div className="panel-label">˚ ☾⭒ Play with the orbits ˚ ☾⭒</div>
            <div className="panel-desc">
              Hover planets and click to see what I work on 
            </div>
          </>
        )}
      </div>

      {/* side “currently” card */}
      <aside className="hero-solar-current">
        <p className="current-label">Currently</p>
        <p className="current-line">
          Enterprise Data &amp; AI intern @ City of Toronto
        </p>
      </aside>
    </div>
  );
};

export default HeroSolar;
