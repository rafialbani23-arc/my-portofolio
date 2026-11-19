import Image from "next/image";
import ProfilePortrait from "../components/ProfilePortrait";
import PortfolioFolders from "../components/PortfolioFolders";
import StrokeText from "../components/StrokeText";
import { certificates } from "../data/certificates";
import { projects } from "../data/projects";
import "./portfolio.css";

export default function Home() {
  return (
    <main className="portfolio">
      <section id="home" className="mountain-opening" aria-label="Home">
        <div className="mountain-stage">
          <div className="mountain-frame">
            <Image className="mountain-distance" src="/images/bromo-panorama.webp" alt="" fill preload sizes="100vw" />
            <Image className="mountain-composite" src="/images/bromo-original.webp" alt="" fill preload sizes="100vw" />
            <span className="mountain-ground" aria-hidden="true" />
            <span className="mountain-person" aria-hidden="true" />
            <span className="mountain-trees mountain-trees-left" aria-hidden="true" />
            <span className="mountain-trees mountain-trees-right" aria-hidden="true" />
          </div>
          <span className="mountain-stars" aria-hidden="true" />
          <p className="opening-title">Welcome to my<br />portfolio</p>
        </div>
      </section>

      <div className="dark-portfolio contours">
        <section id="about" className="wrap section about-section">
          <h2 className="section-heading about-heading" aria-label="About Me">
            <StrokeText text="About Me" strokeColor="#a6baff" fillColor="#f7f9ff" shineColor="#f7f9ff"
              fontSize={112} strokeWidth={2} trigger="scroll" fillMode="wipe" />
          </h2>
          <div className="about-profile">
            <div className="about-slide about-slide-left">
              <h1><span>Hi, I’m</span><br />Rafi Albani<br />Syafarel</h1>
            </div>
            <ProfilePortrait />
            <div className="about-slide about-slide-right">
              <p className="lead">I’m a Software Engineering student. I enjoy turning ideas into functional, visually engaging websites and learning modern web technologies.</p>
            </div>
          </div>

          <div className="timeline-grid">
            <div>
              <h3>Education</h3>
              <div className="timeline-list">
                <article className="timeline-entry">
                  <span className="timeline-number" aria-hidden="true" />
                  <h4>IDN Polytechnic</h4>
                  <p>Software Engineering</p>
                </article>
                <article className="timeline-entry">
                  <span className="timeline-number" aria-hidden="true" />
                  <h4>Hidayatunnajah Islamic Boarding School</h4>
                  <p>Senior High School</p>
                </article>
              </div>
            </div>
            <div>
              <h3 id="experience-heading">Experience</h3>
              <div className="timeline-list timeline-scroll" role="region" aria-labelledby="experience-heading" tabIndex={0}>
                <article className="timeline-entry">
                  <span className="timeline-number" aria-hidden="true" />
                  <h4>EduRace (Education Race)</h4>
                  <p>Participated in educational challenges that encouraged teamwork and problem-solving.</p>
                </article>
                <article className="timeline-entry">
                  <span className="timeline-number" aria-hidden="true" />
                  <h4>Business Competition</h4>
                  <p>Explored business ideas and practiced creative thinking and presentation skills.</p>
                </article>
                <article className="timeline-entry">
                  <span className="timeline-number" aria-hidden="true" />
                  <h4>Mission Impossible</h4>
                  <p>Completed team-based challenges focused on collaboration and strategy.</p>
                </article>
                <article className="timeline-entry">
                  <span className="timeline-number" aria-hidden="true" />
                  <h4>Interviewing Workers on Work in the AI Era</h4>
                  <p>Explored how artificial intelligence is changing jobs through worker interviews.</p>
                </article>
                <article className="timeline-entry">
                  <span className="timeline-number" aria-hidden="true" />
                  <h4>Paperclip Challenge</h4>
                  <p>Practiced negotiation, communication, and creativity through a trading challenge.</p>
                </article>
              </div>
            </div>
          </div>

          <PortfolioFolders entries={[
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
          ]} />
        </section>
      </div>

      <section id="portfolio-intro" className="portfolio-transition contours">
        <a href="/portfolio/#projects" data-portfolio-entry className="portfolio-transition-title">Portfolio</a>
      </section>
    </main>
  );
}
