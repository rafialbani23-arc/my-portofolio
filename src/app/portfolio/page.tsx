import Image from "next/image";
import Link from "next/link";
import ProjectDetails from "../../components/ProjectDetails";
import PortfolioGallery from "../../components/PortfolioGallery";
import PortfolioTransition from "../../components/PortfolioTransition";
import ContactDraft from "../../components/ContactDraft";
import { certificates } from "../../data/certificates";
import { projects } from "../../data/projects";
import "../portfolio.css";

const cvUrl = "/cv/rafi-albani-syafarel.pdf";

export default function PortfolioPage() {
  return (
    <main className="portfolio portfolio-page">
      <PortfolioTransition reverse />
      <div className="light-portfolio contours">
        <section id="projects" className="section wrap gallery">
          <span className="gallery-anchor" id="certificates" />
          <span className="gallery-anchor" id="cv" />
          <h2 className="section-heading">Portfolio</h2>
          <PortfolioGallery
            cv={
              <article className="panel cv-card">
                <div>
                  <h3>CV · Rafi Albani Syafarel</h3>
                  <p>PDF · 2 pages</p>
                </div>
                <a className="button primary" href={cvUrl} target="_blank" rel="noopener noreferrer">
                  View PDF <span aria-hidden="true">↗</span>
                </a>
              </article>
            }
            certificates={certificates.map(({ file, title, issuer }) => (
              <article key={file} className="project panel certificate-card">
                <a href={`/certificates/${file}.pdf`} target="_blank" rel="noopener noreferrer" aria-label={`Open certificate PDF: ${title}`}>
                  <div className="project-preview">
                    <Image
                      src={`/certificates/${file}.webp`}
                      alt=""
                      fill
                      sizes="(max-width: 550px) 85vw, (max-width: 780px) 55vw, 400px"
                    />
                    <span className="certificate-link">View PDF <span aria-hidden="true">↗</span></span>
                  </div>
                  <div className="project-copy">
                    <h3>{title}</h3>
                    <p>{issuer}</p>
                  </div>
                </a>
              </article>
            ))}
            projects={projects.map((project) => (
            <article key={project.title} className="project panel project-card">
              <div className="project-preview">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} application preview`}
                    fill
                    sizes="(max-width: 550px) 85vw, (max-width: 780px) 55vw, 400px"
                  />
                ) : (
                  <span>Preview pending</span>
                )}
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tags" aria-label="Technologies">
                  {project.technologies.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                <ProjectDetails project={project} />
              </div>
            </article>
          ))} />
        </section>

        <div className="portfolio-collage wrap" aria-hidden="true">
          {projects.slice(-4).flatMap(({ image }) => image ? [image] : []).map((image) => (
            <div key={image} className="collage-photo">
              <Image src={image} alt="" fill sizes="(max-width: 550px) 25vw, 165px" />
            </div>
          ))}
        </div>

        <section id="contact" className="wrap section contact-section">
          <h2 className="section-heading reveal">Hubungi Saya</h2>
          <div className="contact-columns">
            <div>
              <div className="panel contact-card reveal">
                <h3>Hubungi</h3>
                <ContactDraft />
              </div>
              <div className="panel contact-card reveal">
                <h3>Find Me</h3>
                <a className="social-link" href="https://github.com/rafialbani23-arc">GitHub <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="panel contact-card reveal">
              <h3>Komentar</h3>
              <p>Guestbook pending.</p>
            </div>
          </div>
        </section>

        <footer className="wrap footer">
          <span>© Rafi Albani Syafarel</span>
          <Link href="/#home">Back to top ↑</Link>
        </footer>
      </div>
    </main>
  );
}
