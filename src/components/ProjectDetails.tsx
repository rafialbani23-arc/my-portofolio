"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import type { Project } from "../data/projects";

export default function ProjectDetails({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();

  return (
    <>
      <button
        className="button primary project-details-button"
        type="button"
        aria-haspopup="dialog"
        aria-label={`Details for ${project.title}`}
        onClick={() => dialog.current?.showModal()}
      >
        Details <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        className="project-details-dialog"
        aria-labelledby={heading}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="project-details-content">
          <div className="project-details-header">
            <h2 id={heading}>{project.title}</h2>
            <form method="dialog">
              <button autoFocus className="project-details-close" aria-label="Close project details">×</button>
            </form>
          </div>
          {project.image && (
            <div className="project-details-preview">
              <Image src={project.image} alt={`${project.title} application preview`} fill sizes="(max-width: 800px) 90vw, 750px" />
            </div>
          )}
          <p>{project.description}</p>
          <ul className="tags" aria-label="Technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
      </dialog>
    </>
  );
}
