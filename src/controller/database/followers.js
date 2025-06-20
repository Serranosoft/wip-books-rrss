import { supabase } from "@/utils/supabase";

/** Encargado de establecer una relación de seguidor-seguido */
export async function follow_db({ followerId, followedId }) {
    const { error } = await supabase.from("followers").insert({ follower_id: followerId, followed_id: followedId, timestamp: ((new Date()).toISOString()).toLocaleString('es-ES') });
    if (error) console.log(error);
}

/** Encargado de eliminar una relación de seguidor-seguido */
export async function unfollow_db({ followerId, followedId }) {
    const { error } = await supabase.from("followers").delete().eq("follower_id", followerId).eq("followed_id", followedId);
    if (error) console.log(error);
}

/** Encargado de recibir los seguidores de un usuario en concreto */
export async function getFollowing_db({ userId }) {
    const { data, error } = await supabase.from("followers").select("followed_id").eq("follower_id", userId);
    if(error) console.log(error);
    return data;
}

/** Encargado de recibir los seguidores de un usuario en concreto, los seguidores que se comprueban son los de una lista de reviews */
export async function getFollowingByBookReviews_db({ userId, reviews }) {
    const users = reviews.map((review) => review.users.id);
    const { data, error } = await supabase.from("followers").select("followed_id").in("followed_id", users).eq("follower_id", userId);
    if (error) console.log(error);
    return data;
}

/** Encargado de recibir la cantidad de seguidores que tiene un usuario */
export async function getFollowersQty_db({ userId }) {
    const { count, error } = await supabase.from("followers").select("*", { count: "exact", head: true }).eq("followed_id", userId);
    if (error) console.log(error);
    return count;
}

/** Encargado de recibir la cantidad de personas que está siguiendo un usuario */
export async function getFollowingQty_db({ userId }) {
    const { count, error } = await supabase.from("followers").select("*", { count: "exact", head: true }).eq("follower_id", userId);
    if (error) console.log(error);
    return count;
}