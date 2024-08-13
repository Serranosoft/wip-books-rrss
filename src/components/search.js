import styles from "@/styles/components/search.module.scss";
import { getAllBooks } from "@/controller/cms/books";
import { useEffect, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import Lupa from "@/components/lupa";



export const fuseOptions = { keys: ["node.title"] };
export default function Search() {

    const [input, setInput] = useState("");
    const [data, setData] = useState(null);
    const [fuse, setFuse] = useState(null);
    const [result, setResult] = useState("");

    /** Adquiere los libros */
    useEffect(() => {
        if (!data) fetchBooks();
    }, [])

    /** Instanciar «fuse» únicamente cuando tenemos la data lista */
    useEffect(() => {
        if (data) {
            const fuse = new Fuse(data, fuseOptions);
            setFuse(fuse);
        }
    }, [data])

    /** Cuando el usuario empiece a escribir se recibirá el resultado del filtrado */
    useEffect(() => {
        if (input.length > 0) {
            const result = fuse.search(input);
            setResult(result);
        } else {
            setResult(null);
        }
    }, [input])


    async function fetchBooks() {
        const data = await getAllBooks();
        if (data) {
            setData(data);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div>
                        <span>Libros</span>
                    </div>
                    <input type="search" placeholder="Escribe un libro..." className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} disabled={!fuse}></input>
                    <Lupa />
                </div>
                {
                    result && result.length > 0 &&
                    <div className={styles.result}>
                        {result.map((book) =>
                            <Link key={book.item.node.postId} href={`/libro/${book.item.node.slug}`}>
                                <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1678747712i/117703749.jpg"></img>
                                <span>{book.item.node.title}</span>
                                <span>de Patti Smith</span>
                            </Link>
                        )}
                    </div>
                }
            </div>
        </>
    )
}


export const getStaticProps = async () => {
    const data = await getAllBooks();
    return {
        props: { data }
    };
}