import { supabase } from "@/utils/supabase";

export async function login_auth() {
    supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function logout_auth() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
}

export async function getSession_auth() {
    const { data: { user } } = await supabase.auth.getUser();
    return { user };
}

export async function getUserInfo_db({ id }) {
    const { data, error } = await supabase.from("users").select("name, image, slug").eq("id", id);
    if (error) console.log(error);
    return data;
}

export async function getUserSlugs_db() {
    const { data, error } = await supabase.from("users").select("slug");
    if (error) console.log(error);
    return data;
}

export async function getUserInfoBySlug_db({ slug }) {
    const { data, error } = await supabase.from("users").select("name, image, slug, about, country, city").eq("slug", slug);
    if (error) console.log(error);
    return data;
}