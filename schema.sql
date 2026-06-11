-- Run this in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor → New Query

-- 1. Create the messages table
CREATE TABLE IF NOT EXISTS messages (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  read        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Disable Row Level Security for this table
--    (Edge Function uses service_role key which bypasses RLS anyway,
--     but this keeps the messages page fetch clean too)
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- 3. Create an index on created_at for fast sorting
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at DESC);

-- Done! You should see the "messages" table in your Table Editor.
