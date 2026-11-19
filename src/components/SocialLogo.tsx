import type { socials } from "../data/socials";

export default function SocialLogo({ network }: { network: keyof typeof socials }) {
  if (network === "github") {
    return (
      <svg className="social-logo social-logo-github" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.55l-.02-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.95.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.12-3.06 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.13v3.18c0 .31.21.67.79.55A11.5 11.5 0 0 0 12 .7Z" />
      </svg>
    );
  }

  if (network === "instagram") {
    return (
      <svg className="social-logo social-logo-instagram" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.35" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.2" cy="7.9" r=".95" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className="social-logo social-logo-whatsapp" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.7 15.5A7.1 7.1 0 1 1 8.6 18L5 19l.7-3.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path fill="currentColor" d="M9 8.5c.3-.3.7-.3.9.1l.8 1.5c.1.3-.1.5-.4.8l-.3.4c.4 1 1.4 2 2.6 2.4l.6-.8c.2-.2.4-.2.7-.1l1.5.8c.3.1.3.4.2.7-.3 1-1.2 1.3-2 1.2-1.2-.2-2.6-1-3.7-2-1-1-1.8-2.2-1.8-3.4 0-.7.3-1.3.9-1.6Z" />
    </svg>
  );
}
