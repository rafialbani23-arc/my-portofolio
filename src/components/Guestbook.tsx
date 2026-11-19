"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Entry = { id: string; name: string; message: string; createdAt: number };
const dateFormat = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeZone: "Asia/Jakarta" });

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [reload, setReload] = useState(0);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const requestId = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/comments", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Comments unavailable");
        const { comments } = await response.json() as { comments: Entry[] };
        setEntries((current) => {
          const knownIds = new Set(comments.map(({ id }) => id));
          return [...(current ?? []).filter(({ id }) => !knownIds.has(id)), ...comments].slice(0, 30);
        });
        setLoadError(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadError(true);
      });
    return () => controller.abort();
  }, [reload]);

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("guest-name")).trim();
    const message = String(values.get("guest-message")).trim();
    if (!name || !message) {
      setStatus("Isi nama dan komentar terlebih dahulu.");
      return;
    }
    requestId.current ??= crypto.randomUUID();
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: requestId.current, name, message }),
      });
      if (!response.ok) throw new Error("Comment could not be saved");
      const { comment } = await response.json() as { comment: Entry };
      setEntries((current) => [comment, ...(current ?? []).filter(({ id }) => id !== comment.id)].slice(0, 30));
      form.reset();
      requestId.current = null;
      setStatus("Komentar sudah dipublikasikan.");
    } catch {
      setStatus("Komentar belum bisa disimpan. Coba lagi.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="guestbook">
      <form className="contact-form" onSubmit={publish} onInput={() => { requestId.current = null; setStatus(""); }}>
        <label>Nama<input name="guest-name" autoComplete="name" maxLength={60} required disabled={sending} /></label>
        <label>Komentar publik<textarea name="guest-message" rows={3} maxLength={600} required disabled={sending} /></label>
        <button className="button primary" type="submit" disabled={sending}>{sending ? "Menyimpan…" : "Kirim komentar"}</button>
        <p role="status">{status}</p>
      </form>
      {loadError ? (
        <p>Komentar belum bisa dimuat. <button className="guestbook-retry" type="button" onClick={() => {
          setLoadError(false);
          setReload((value) => value + 1);
        }}>Muat ulang</button></p>
      ) : entries === null ? <p role="status">Memuat komentar…</p> :
        entries.length === 0 && <p>Belum ada komentar.</p>}
      {!!entries?.length && (
        <ul className="guestbook-entries" aria-label="Komentar terbaru">
          {entries.map(({ id, name, message, createdAt }) => {
            const date = new Date(createdAt * 1000);
            return (
              <li key={id}>
                <div><strong>{name}</strong> <time dateTime={date.toISOString()}>{dateFormat.format(date)}</time></div>
                <p>{message}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
