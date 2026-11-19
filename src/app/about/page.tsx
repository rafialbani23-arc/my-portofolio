import MaskedHeading from "../../components/MaskedHeading";
import StrokeText from "../../components/StrokeText";
import AnimatedHeading from "../../components/AnimatedHeading";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-6 pb-24 pt-40 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-lime-400">
            01 / About Me
          </p>

          <div className="about-heading">
            {/* Komponen StrokeText di atas */}
          
          <StrokeText
            text="Beyond the Code."
            fontSize={100}
            fontWeight={800}
            strokeColor="#A3E635"
            fillColor="#FFFFFF"
            strokeWidth={1.5}
            drawDuration={1.8}
            fillDelay={0.2}
            stagger={0.05}
            trigger="scroll"
            fillMode="wipe"
          />

          </div>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Hi, I&apos;m Rafi Albani Syafarel, a Software Engineering
            student passionate about building meaningful digital
            experiences through technology, creativity, and design.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 transition duration-300 hover:border-lime-400/40">
            <span className="text-sm text-lime-400">01 — Who I Am</span>

            <h2 className="mt-5 text-3xl font-semibold">
              Developer & Creative Thinker.
            </h2>

            <p className="mt-5 leading-8 text-neutral-400">
              I enjoy turning ideas into functional and visually
              engaging websites. I&apos;m continuously learning modern
              web technologies and improving my skills as a developer.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 transition duration-300 hover:border-lime-400/40">
            <span className="text-sm text-lime-400">02 — My Vision</span>

            <h2 className="mt-5 text-3xl font-semibold">
              Building for the Future.
            </h2>

            <p className="mt-5 leading-8 text-neutral-400">
              My goal is to become a professional software engineer,
              develop impactful digital products, and build a career
              that combines technology, innovation, and entrepreneurship.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            My Philosophy
          </p>

          <p className="mt-6 max-w-4xl text-3xl font-medium leading-snug md:text-5xl">
            &ldquo;Great software is not just about writing code.
            It&apos;s about creating something that makes a
            difference.&rdquo;
          </p>
        </div>
      </div>
    </main>
  );
}