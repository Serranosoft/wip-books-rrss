import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from 'uuid';

export async function getBookStatus_db({ userId, bookId }) {
    const { data, error } = await supabase.from("user_books").select("want_to_read, currently_reading, finished_reading").eq("user_id", userId).eq("book_id", bookId).single();
    if (error) console.log(error);
    return data;
}

export async function setBookAsWantToRead_db({ userId, bookId, want_to_read }) {
    const { error } = await supabase.from("user_books").upsert({ id: uuidv4(), user_id: userId, book_id: bookId, want_to_read: want_to_read, currently_reading: false, finished_reading: false  }, { onConflict: "user_id, book_id"});
    if (error) console.log(error);
}

export async function setBookReading_db({ userId, bookId, currently_reading }) {
    const { error } = await supabase.from("user_books").upsert({ id: uuidv4(), user_id: userId, book_id: bookId, want_to_read: false, currently_reading: currently_reading, finished_reading: false }, { onConflict: "user_id, book_id"});
    if (error) console.log(error);
}

export async function setBookFinishedReading_db({ userId, bookId, finished_reading }) {
    const { error } = await supabase.from("user_books").upsert({ id: uuidv4(), user_id: userId, book_id: bookId, want_to_read: false, currently_reading: false, finished_reading: finished_reading  }, { onConflict: "user_id, book_id"});
    if (error) console.log(error);
}

