import Button from "@/components/button";
import Rating from "@/components/rating";
import { getListsFromUser_db, insertList_db, rateList_db } from "@/controller/database/lists";
import styles from "@/styles/pages/groups/groups.module.scss";
import { Context } from "@/utils/context";
import { useContext, useEffect, useState } from "react";

export default function Listas() {

    const { userId } = useContext(Context);
    /** Listas con sus libros */
    const [lists, setLists] = useState([]);
    /** Campos a rellenar por el usuario cuando añade una nueva lista (Esto irá en una sección o modal aparte) */
    const [listName, setListName] = useState("");
    const [listStatus, setListStatus] = useState("");

    /** Al recibir un userId válido, obtiene sus listas */
    useEffect(() => {
        get();
    }, [userId])

    async function get() {
        const result = await getListsFromUser_db({ userId });
        setLists(result);
    }

    /** Encargado de añadir una nueva lista */
    async function post() {
        await insertList_db({ userId: userId, name: listName, status: listStatus, books: [1279] })
    }

    /** Encargado de valorar una lista (Test purpose, esto irá en otra sección donde los demás usuarios podrán valorar cada una de ellas) */
    async function setRefRating(reference, rating) {
        await rateList_db({listId: reference, rating })
    }

    /** DOM temporal */
    return (
        <div className={styles.container}>
            <div className={styles.test1}>
                <div>
                    <label>Nombre de la lista</label>
                    <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} />
                </div>
                <div>
                    <label>Estado de la lista</label>
                    <input type="text" value={listStatus} onChange={(e) => setListStatus(e.target.value)} />
                </div>
                <Button onClick={post}>Crear lista</Button>
            </div>

            <div className={styles.test2}>
                {lists.map(list => {
                    console.log(list.id);
                    return (
                        <div className={styles.testItem}>
                            <span>Valorar lista</span>
                            <Rating {...{ userId, ratingReference: list.id, setRating: setRefRating }} />
                            <h2>Lista {list.name}</h2>
                            <p>Valoración: {list.rating}</p>
                            <p>Estado: {list.status}</p>
                            <h3>Libros:</h3>
                            {
                                list.books.map(book => {
                                    return (
                                        <div>
                                            <span>{book.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}