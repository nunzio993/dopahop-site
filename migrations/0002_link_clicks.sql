-- Daily click totals for the tracked links /go/<source>.
-- Aggregates only: no IP, no User-Agent, nothing that identifies a person.
CREATE TABLE IF NOT EXISTS link_clicks (
  day TEXT NOT NULL,
  source TEXT NOT NULL,
  campaign TEXT NOT NULL,
  platform TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, source, campaign, platform)
);
