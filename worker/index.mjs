const selection = "SELECT id, name, message, created_at AS createdAt FROM comments";
const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function readComment(request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let body = "";
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(body + decoder.decode());
    return data && typeof data.id === "string" && typeof data.name === "string" &&
      typeof data.message === "string" ? data : null;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname !== "/api/comments" && pathname !== "/api/comments/") {
      return env.ASSETS?.fetch(request) ?? new Response("Not found", { status: 404 });
    }

    try {
      if (request.method === "GET") {
        const { results } = await env.DB.prepare(`${selection} ORDER BY created_at DESC, id DESC LIMIT 30`).all();
        return json({ comments: results });
      }
      if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
      if (request.headers.get("Sec-Fetch-Site") === "cross-site") return json({ error: "Forbidden." }, 403);
      if (request.headers.get("Content-Type")?.split(";")[0] !== "application/json") {
        return json({ error: "Expected JSON." }, 415);
      }

      const data = await readComment(request);
      const name = data?.name.trim() ?? "";
      const message = data?.message.trim() ?? "";
      if (!data || !uuidPattern.test(data.id) || !name || name.length > 60 || !message || message.length > 600) {
        return json({ error: "Enter a name and comment." }, 400);
      }

      const insert = env.DB.prepare("INSERT INTO comments (id, name, message) VALUES (?, ?, ?) ON CONFLICT (id) DO NOTHING")
        .bind(data.id, name, message);
      const select = env.DB.prepare(`${selection} WHERE id = ?`).bind(data.id);
      const [, { results }] = await env.DB.batch([insert, select]);
      const [comment] = results;
      if (comment.name !== name || comment.message !== message) return json({ error: "Comment ID already used." }, 409);
      return json({ comment }, 201);
    } catch {
      return json({ error: "Comments are temporarily unavailable." }, 503);
    }
  },
};
