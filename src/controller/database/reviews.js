import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

/** Añadir una review */
export async function addReview({ content, rating, bookId, userId }) {
    const { error } = await supabase.from("reviews").insert({ id: uuidv4(), content: content, rating: rating, "book_id": bookId, "user_id": userId });
    if (error) console.log(error);
}

/** Actualizar una review */
export async function updateReview({ reviewId, content, rating, bookId, userId }) {
    const { error } = await supabase.from("reviews").update({ content: content, rating: rating, "book_id": bookId, "user_id": userId }).eq("id", reviewId);
    if (error) console.log(error);
}

/** Eliminar una review */
export async function removeReview({ reviewId }) {
    const response = await supabase.from("reviews").delete().eq("id", reviewId);
    console.log(response);
}

/** Obtener todas las reviews (Filtradas de 8 en 8 con un offset) */
export async function getAllReviewsById({ bookId, offset = 0 }) {
    const { data, error } = await supabase.from("reviews").select("id, content, rating, users (name, image, slug)").eq("book_id", bookId)/* .range(offset, 8) */;
    if (error) {
        return;
    }
    return data;
}

/** Devuelve los 20 últimos registros */
export async function getAllReviews() {
    const { data, error } = await supabase.from("reviews").select().limit(20);
    if (error) {
        console.log(error);
        return;
    }
    return data;
}
