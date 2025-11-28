import { useState } from "react";
import "./Projects.css";
import MusicPlayer from "./MusicPlayer";

import demo1 from "../assets/project-1.webp";
import demo2 from "../assets/project-2.webp";

type MediaType = "image" | "video";

type Media = {
  id: "folderA" | "folderB" | "folderC";
  label: string;
  caption?: string;
  type: MediaType;
  src: string;
  title: string;
  githubUrl?: string;
};

const mediaList: Media[] = [
  {
    id: "folderA",
    label: "Chat with Youtube",
    caption: "A full-stack AI-powered web application that lets users paste YouTube URLs and ask questions about video content.",
    type: "image",
    src: demo1,
    title: "Project One screenshot",
    githubUrl: "https://github.com/chloeenn/chat-ytb",
  },
  {
    id: "folderB",
    label: "Syllabus to Calendar",
    caption: "An app that helps students turn course syllabi (PDFs) into .ics calendar files.",
    type: "image",
    src: demo2,
    title: "Project Two screenshot",
    githubUrl: "https://github.com/chloeenn/syncabus",
  },

];

type FolderId = Media["id"];

function Projects() {
  const [activeFolder, setActiveFolder] = useState<FolderId | null>(null);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

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
        className={`imac-shell ${isPlayingMusic ? "music-playing" : ""}`}
        aria-label="Interactive iMac with project folders"
      >
        {/* Outer black bezel with camera */}
        <div className="imac-bezel">
          <div className="imac-camera" />
          <div className="imac-screen" aria-live="polite">
            {/* MUSIC PLAYER (when active) */}
            {showMusicPlayer && (
              <MusicPlayer 
                onClose={() => setShowMusicPlayer(false)} 
                inline={true}
                onPlayStateChange={setIsPlayingMusic}
              />
            )}

            {/* MUSIC ICON BUTTON - show only on default folder grid */}
            {!activeMedia && !showMusicPlayer && (
              <button
                className="imac-music-btn"
                onClick={() => setShowMusicPlayer(true)}
                aria-label="Open music player"
                title="Music player"
              >
                ♫
              </button>
            )}

            {/* FOLDER GRID (default state) */}
            {!activeMedia && !showMusicPlayer && (
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
                    aria-label="Close project viewer"
                  >
                    ✕
                  </button>
                </header>

                <div className="project-media-frame">
                  {activeMedia.type === "image" ? (
                    <a
                      href={activeMedia.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-media-link"
                    >
                      <img
                        src={activeMedia.src}
                        alt={activeMedia.title}
                        className="project-media"
                      />
                    </a>
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
