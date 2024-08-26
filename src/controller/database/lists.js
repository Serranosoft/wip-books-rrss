import { supabase } from "@/utils/supabase";

/** Crea una nueva lista */
export async function insertList_db({ userId, name, status, books }) {
    const { data, error } = await supabase.from("lists").insert({ user_id: userId, name, status }).select("id").single();
    console.log(data);
    if (error) {
        console.log(error);
    } else {
        if (data) {
            await insertBooksToList_db({ listId: data.id, books })
        }
    }
}

/** Edita una lista existente */
export async function editList_db({ listId, name, status, books }) {
    const { data, error } = await supabase.from("lists").update({ name, status }).eq("id", listId).select("id");
    if (error) {
        console.log(error);
    } else {
        if (data) {
            await insertBooksToList_db({ listId: data.id, books })
        }
    }
}

/** Encargado de insertar libros en una lista */
async function insertBooksToList_db({ listId, books }) {
    let rows = [];
    books.forEach(book => rows.push({ list_id: listId, book_id: book }))
    const { error } = await supabase.from("lists_books").insert(rows);
    console.log(error);
}

/** Valorar una lista */
export async function rateList_db({ listId, rating }) {
    const { error } = await supabase.from("lists").update({ rating }).eq("id", listId);
    if (error) console.log(error);
}

/** Obtener listas */
export async function getListsFromUser_db({ userId }) {
    const { data: lists, error: error_lists } = await supabase.from("lists").select("id, name, rating, status").eq("user_id", userId);
    if (!lists) return [];

    const ids = lists.map(list => list.id);
    const { data: books, error: error_books } = await supabase.from("lists_books").select("book_id, list_id").in("list_id", ids);

    // WIP (Obtener data del CMS con la información de los libros)
    books.forEach((book, index) => {
        book.name = "nombre " + index
    });

    // Construyo el resultado
    const result = [];
    lists.forEach(list => {
        let item = {
            id: list.id,
            name: list.name,
            status: list.status,
            rating: list.rating,
            books: []
        }
        books.forEach(book => book.list_id === list.id && item.books.push({ name: book.name }));
        result.push(item);
    })

    console.log(result);

    return result;
}