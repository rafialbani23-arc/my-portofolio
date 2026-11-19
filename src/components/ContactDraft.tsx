"use client";

import { useState, type FormEvent } from "react";
import { socials } from "../data/socials";

export default function ContactDraft() {
  const [status, setStatus] = useState("");

  function openWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name")).trim();
    const email = String(fields.get("email")).trim();
    const message = String(fields.get("message")).trim();
    if (!name || !message) {
      setStatus("Isi nama dan pesan sebelum membuka WhatsApp.");
      return;
    }
    const url = new URL(socials.whatsapp.href);
    url.searchParams.set("text", `Nama: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(url.href, "_blank", "noopener,noreferrer");
    setStatus("Lanjutkan dengan menekan Kirim di WhatsApp.");
  }

  return (
    <form className="panel contact-form" onSubmit={openWhatsApp} onInput={() => setStatus("")}>
      <p>Isi formulir untuk membuka chat WhatsApp dengan pesan yang sudah terisi.</p>
      <label>Nama<input name="name" autoComplete="name" maxLength={80} required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" maxLength={200} required /></label>
      <label>Pesan<textarea name="message" rows={4} maxLength={1800} required /></label>
      <button className="button primary" type="submit">Buka WhatsApp</button>
      <p role="status">{status}</p>
    </form>
  );
}
