"use client";

import { useState, type FormEvent } from "react";

export default function ContactDraft() {
  const [status, setStatus] = useState("");

  async function copyDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const draft = `Name: ${fields.get("name")}\nEmail: ${fields.get("email")}\n\n${fields.get("message")}`;

    try {
      await navigator.clipboard.writeText(draft);
      setStatus("Draft copied.");
    } catch {
      setStatus("Clipboard unavailable. You can select and copy your message.");
    }
  }

  return (
    <form className="panel contact-form" onSubmit={copyDraft} onInput={() => setStatus("")}>
      <p>Direct messaging is pending. You can copy your draft below.</p>
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Message<textarea name="message" rows={4} required /></label>
      <button className="button primary" type="submit">Copy message</button>
      <p role="status">{status}</p>
    </form>
  );
}
