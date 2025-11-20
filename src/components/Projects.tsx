import { useState } from "react";
import "./Projects.css";

import demo1 from "../assets/project-1.png";
import demo2 from "../assets/project-2.png";

type MediaType = "image" | "video";

type Media = {
  id: "folderA" | "folderB" | "folderC";
  label: string;
  caption?: string;
  type: MediaType;
  src: string;
  title: string;
};

const mediaList: Media[] = [
  {
    id: "folderA",
    label: "Project One",
    caption: "Short description of project one.",
    type: "image",
    src: demo1,
    title: "Project One screenshot",
  },
  {
    id: "folderB",
    label: "Project Two",
    caption: "Short description of project two.",
    type: "image",
    src: demo2,
    title: "Project Two screenshot",
  },
  {
    id: "folderC",
    label: "Project Three",
    caption: "Short description of project three.",
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Demo video",
  },
];

type FolderId = Media["id"];

function Projects() {
  const [activeFolder, setActiveFolder] = useState<FolderId | null>(null);

  const activeMedia = mediaList.find((m) => m.id === activeFolder) ?? null;

  const handleOpen = (id: FolderId) => {
    setActiveFolder(id);
  };

  const handleClose = () => {
    setActiveFolder(null);
  };

  return (
    <section className="projects" id="projects">
      <h1 className="projects-title">Projects.</h1>

      <div
        className="imac-shell"
        aria-label="Interactive iMac with project folders"
      >
        {/* Outer black bezel with camera */}
        <div className="imac-bezel">
          <div className="imac-camera" />
          <div className="imac-screen" aria-live="polite">
            {/* FOLDER GRID (default state) */}
            {!activeMedia && (
              <div
                className="folder-grid"
                role="list"
                aria-label="Project folders"
              >
                {mediaList.map((media) => (
                  <button
                    key={media.id}
                    className="folder-tile"
                    onClick={() => handleOpen(media.id)}
                    role="listitem"
                  >
                    <span className="folder-icon" aria-hidden="true" />
                    <span className="folder-name">{media.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* PROJECT VIEWER (when folder is active) */}
            {activeMedia && (
              <div className="project-viewer">
                <header className="project-viewer-header">
                  <div>
                    <p className="project-viewer-label">
                      {activeMedia.label}
                    </p>
                    {activeMedia.caption && (
                      <p className="project-viewer-caption">
                        {activeMedia.caption}
                      </p>
                    )}
                  </div>

                  <button
                    className="project-close-btn"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </header>

                <div className="project-media-frame">
                  {activeMedia.type === "image" ? (
                    <img
                      src={activeMedia.src}
                      alt={activeMedia.title}
                      className="project-media"
                    />
                  ) : (
                    <iframe
                      className="project-media"
                      title={activeMedia.title}
                      src={activeMedia.src}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
    </section>
  );
}

export default Projects;
