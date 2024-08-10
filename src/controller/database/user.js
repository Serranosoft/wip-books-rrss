import { supabase } from "@/utils/supabase";

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

export async function getUserInfo_db({ id }) {
    const { data, error } = await supabase.from("users").select("name, image, slug").eq("id", id);
    if (error) console.log(error);
    return data;
}

export async function getUserSlugs() {
    const { data, error } = await supabase.from("users").select("slug");
    if (error) console.log(error);
    return data;
}

export async function getUserInfoBySlug({ slug }) {
    const { data, error } = await supabase.from("users").select("name, image").eq("slug", slug);
    if (error) console.log(error);
    return data;
}