import { getWeekRange } from "@/utils/activity";
import { supabase } from "@/utils/supabase";

/** 1. Obtener todas las reviews escritas por mis followings en un rango de una semana */
export async function getReviewsActivity_db({ following }) {
    const followersIds = following.map((following) => following["followed_id"]);
    const { data, error } = await supabase.from("reviews").select("id, content, rating, published, users(name, slug), books(name)").in("user_id", followersIds).gte("published", getWeekRange()).limit(10);
    if (error) console.log(error);
    return data;
}