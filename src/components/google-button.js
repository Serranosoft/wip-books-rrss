import { supabase } from "@/layout/layout";

export default function GoogleButton() {

    async function signIn() {
        supabase.auth.signInWithOAuth({ provider: 'google' });
    }

    return (
        <button title="iniciar sesion con google" onClick={signIn}>Iniciar sesion con google</button>
    )
}