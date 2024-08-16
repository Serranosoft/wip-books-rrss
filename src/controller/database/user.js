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
    const { data, error } = await supabase.from("users").select("id, name, image, slug, title, about, country, city").eq("slug", slug);
    if (error) console.log(error);
    return data;
}

/** Endpoint para actualizar un usuario de la base de datos */
export async function editUserInfo_db({ userId, name, title, country, city, slug, about }) {
    const { error } = await supabase.from("users").update({ name: name, title: title, country: country, city: city, slug: slug, about: about }).eq("id", userId);
    if (error) console.log(error);
}