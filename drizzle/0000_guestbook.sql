CREATE TABLE comments (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 60),
  message TEXT NOT NULL CHECK (length(message) BETWEEN 1 AND 600),
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE INDEX comments_created_at_idx ON comments (created_at DESC, id DESC);
