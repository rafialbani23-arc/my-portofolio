import Image from "next/image";
import PortfolioTransition from "../components/PortfolioTransition";
import ProfilePortrait from "../components/ProfilePortrait";
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
              <a className="button primary" data-portfolio-entry href="/portfolio/#projects">View Projects <span aria-hidden="true">↗</span></a>
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
              <a key={id} className="folder" data-portfolio-entry href={`/portfolio/#${id}`}>
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

      <PortfolioTransition />
    </main>
  );
}
