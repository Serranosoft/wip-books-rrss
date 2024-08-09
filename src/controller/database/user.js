import { supabase } from "@/layout/layout";

export async function login() {
    supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
}

export async function getSession() {
    const { data: { user } } = await supabase.auth.getUser();
    return { user };
}

export async function isAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user && !!user.id;
}