import Image from "next/image";
import ProjectDetails from "../components/ProjectDetails";
import ProfilePortrait from "../components/ProfilePortrait";
import PortfolioGallery from "../components/PortfolioGallery";
import ContactDraft from "../components/ContactDraft";
import { certificates } from "../data/certificates";
import { projects } from "../data/projects";
import "./portfolio.css";

const cvUrl = "/cv/rafi-albani-syafarel.pdf";

export default function Home() {
  return (
    <main className="portfolio">
      <section id="home" className="mountain-opening" aria-label="Home">
        <div className="mountain-stage">
          <div className="mountain-frame">
            <Image src="/images/mountain-opening.webp" alt="" fill preload sizes="100vw" />
          </div>
          <span className="mountain-stars" aria-hidden="true" />
          <p className="opening-title">Welcome to my<br />portfolio</p>
        </div>
      </section>

      <div className="dark-portfolio contours">
        <section id="about" className="wrap section about-section">
          <h2 className="section-heading reveal">About Me</h2>
          <div className="about-profile">
            <div className="reveal">
              <h1><span>Hi, I’m</span><br />Rafi Albani<br />Syafarel</h1>
              <a className="button primary" href={cvUrl} target="_blank" rel="noopener noreferrer">View CV <span aria-hidden="true">↗</span></a>
            </div>
            <ProfilePortrait />
            <div className="reveal">
              <p className="lead">I’m a Software Engineering student. I enjoy turning ideas into functional, visually engaging websites and learning modern web technologies.</p>
              <a className="button primary" href="#projects">View Projects <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="timeline-grid">
            <div>
              <h3>Education</h3>
              <div className="timeline-list">
                <article className="timeline-entry">
                  <h4>IDN Polytechnic</h4>
                  <p>Software Engineering</p>
                </article>
                <article className="timeline-entry">
                  <h4>Hidayatunnajah Islamic Boarding School</h4>
                </article>
              </div>
            </div>
            <div>
              <h3 id="experience-heading">Experience</h3>
              <div className="timeline-list timeline-scroll" role="region" aria-labelledby="experience-heading" tabIndex={0}>
                <article className="timeline-entry">
                  <h4>EduRace (Education Race)</h4>
                  <p>Participated in educational challenges that encouraged teamwork and problem-solving.</p>
                </article>
                <article className="timeline-entry">
                  <h4>Business Competition</h4>
                  <p>Explored business ideas and practiced creative thinking and presentation skills.</p>
                </article>
                <article className="timeline-entry">
                  <h4>Mission Impossible</h4>
                  <p>Completed team-based challenges focused on collaboration and strategy.</p>
                </article>
                <article className="timeline-entry">
                  <h4>Interviewing Workers on Work in the AI Era</h4>
                  <p>Explored how artificial intelligence is changing jobs through worker interviews.</p>
                </article>
                <article className="timeline-entry">
                  <h4>Paperclip Challenge</h4>
                  <p>Practiced negotiation, communication, and creativity through a trading challenge.</p>
                </article>
              </div>
            </div>
          </div>

          <div className="folders">
            {[
              {
                label: "Projects",
                id: "projects",
                count: projects.length,
                previews: projects.flatMap(({ image }) => image ? [image] : []).slice(0, 3),
              },
              {
                label: "Certificates",
                id: "certificates",
                count: certificates.length,
                previews: certificates.slice(0, 3).map(({ file }) => `/certificates/${file}.webp`),
              },
              { label: "CV", id: "cv", count: 1, previews: [] },
            ].map(({ label, id, count, previews }) => (
              <a key={id} className="folder" href={`#${id}`}>
                <span className="folder-papers" aria-hidden="true">
                  {previews.map((src) => (
                    <span key={src} className="folder-paper">
                      <Image src={src} alt="" fill sizes="(max-width: 550px) 26vw, 220px" />
                    </span>
                  ))}
                  {previews.length === 0 && <span className="folder-paper folder-document" />}
                </span>
                <span className="folder-front"><strong>{count}</strong>{label}<span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="portfolio-transition contours" aria-hidden="true">
        <span className="portfolio-transition-title">Portfolio</span>
      </div>

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
          <a href="#home">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
