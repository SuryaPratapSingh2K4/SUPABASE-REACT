import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    "https://xnbmivpgajatalwkosyg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuYm1pdnBnYWphdGFsd2tvc3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NTY3NzcsImV4cCI6MjA3MzUzMjc3N30.clJC-uhwXTHZlCHNjaWerz29TrQ-haAwQIy45I8YPYk"
);