import { supabase } from "@/utils/supabase";

export async function follow_db({ followerId, followedId }) {
    const { error } = await supabase.from("followers").insert({ follower_id: followerId, followed_id: followedId });
    if (error) console.log(error);
}
export async function unfollow_db({ followerId, followedId }) {
    const { error } = await supabase.from("followers").delete().eq("follower_id", followerId).eq("followed_id", followedId);
    if (error) console.log(error);
}

export async function followingByBookReviews({ userId, reviews }) {
    const users = reviews.map((review) => review.users.id);
    const { data, error } = await supabase.from("followers").select("followed_id").in("followed_id", users).eq("follower_id", userId);
    if (error) console.log(error);
    return data;
}