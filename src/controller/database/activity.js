import { getWeekRange } from "@/utils/activity";
import { supabase } from "@/utils/supabase";

/** 1. Obtener todas las reviews escritas por mis followings en un rango de una semana */
export async function getReviewsActivity_db({ following }) {
    const followersIds = following.map((following) => following["followed_id"]);
    const { data, error } = await supabase.from("reviews").select("id, content, rating, published, users(name, slug, image, title), books(name, slug)").in("user_id", followersIds).gte("published", getWeekRange()).limit(3);
    if (error) console.log(error);
    return data;
}

export async function getFollowsActivity_db({ following }) {
    const followersIds = following.map((following) => following["followed_id"]);

    const { data, error } = await supabase
    .from("followers")
    .select(`
        follower:users!followers_follower_id_fkey(name, slug),
        followed:users!followers_followed_id_fkey(name, slug),
        timestamp
    `)
    .in("follower_id", followersIds)
    .gte("timestamp", getWeekRange())
    .limit(3);

    if (error) console.log(error);
    return data;
}