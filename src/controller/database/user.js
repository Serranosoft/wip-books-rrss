import { supabase } from "@/layout/layout";

export async function getSession() {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);
}

export async function isAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user.id;
}