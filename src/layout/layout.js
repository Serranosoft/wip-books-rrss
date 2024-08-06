import Header from "./header";
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://onwlwezgtoqocpnhilwr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud2x3ZXpndG9xb2NwbmhpbHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3ODA0ODYsImV4cCI6MjAzODM1NjQ4Nn0.gXpCmSdPxj-yEY8KB_LaJ6YmZ4oM5WrBY77cuGn8ntQ');

export default function Layout({ children }) {

    return (
        <>
            <Header />
            {children}
        </>
    )
}