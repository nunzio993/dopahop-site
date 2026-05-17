-- D1 schema for iOS waitlist
-- Apply with:
--   wrangler d1 execute dopahop_waitlist --remote --file=migrations/0001_waitlist_create.sql

CREATE TABLE IF NOT EXISTS ios_signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  use_case TEXT,
  locale TEXT NOT NULL CHECK (locale IN ('it', 'en', 'es', 'de', 'fr')),
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ios_signups_locale ON ios_signups(locale);
CREATE INDEX IF NOT EXISTS idx_ios_signups_created_at ON ios_signups(created_at);
