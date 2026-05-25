import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ibzzlxvwjcpxwwpczenj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlienpseHZ3amNweHd3cGN6ZW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNDk5MDcsImV4cCI6MjA5NDkyNTkwN30.VLos3o3J76W-ePQDfuGjfX9eFXF2oyNsexcEcdBEqR8'

export const supabase = createClient(supabaseUrl, supabaseKey)