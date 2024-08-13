import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

/** Añadir una review */
export async function addReview_db({ content, rating, bookId, userId }) {
    const { error } = await supabase.from("reviews").insert({ id: uuidv4(), content: content, rating: rating, "book_id": bookId, "user_id": userId });
    if (error) console.log(error);
}

/** Actualizar una review */
export async function editReview_db({ reviewId, content, rating }) {
    const { error } = await supabase.from("reviews").update({ content: content, rating: rating }).eq("id", reviewId);
    if (error) console.log(error);
}

/** Eliminar una review */
export async function deleteReview_db({ reviewId }) {
    const response = await supabase.from("reviews").delete().eq("id", reviewId);
    console.log(response);
}

/** Obtener todas las reviews (Filtradas de 8 en 8 con un offset) */
export async function getAllReviewsById_db({ bookId, offset = 0 }) {
    const { data, error } = await supabase.from("reviews").select("id, content, rating, users (id, name, image, slug)").eq("book_id", bookId)/* .range(offset, 8) */;
    if (error) {
        return;
    }
    return data;
}

/** Devuelve true/false dependiendo si un usuario ya ha escrito una review o no */
export async function userReviewedBookId_db({ bookId, userId }) {
    const { count, error } = await supabase.from("reviews").select("*", { count: 'exact', head: true }).eq("book_id", bookId).eq("user_id", userId);
    if (error) {
        return false;
    } else if (count) {
        return true
    } else {
        return false;
    }
}

/** Devuelve los 20 últimos registros */
export async function getAllReviews_db() {
    const { data, error } = await supabase.from("reviews").select().limit(20);
    if (error) console.log(error);
    return data;
}

export async function getTotalReviewsById_db({ bookId }) {
    const { count, error } = await supabase.from("reviews").select("*", { count: 'exact', head: true }).eq("book_id", bookId).gte("content", 0);
    if (error) console.log(error);
    return count;
}

export async function getTotalRatingsById_db({ bookId }) {
    const { count, error } = await supabase.from("reviews").select("*", { count: 'exact', head: true }).eq("book_id", bookId);
    if (error) console.log(error);
    return count;
}