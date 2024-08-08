import { getAllBooks } from "@/controller/cms/books";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";

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
        if (input.length > 1) {
            const result = fuse.search(input);
            setResult(result);
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
            <div>
                <input type="search" value={input} onChange={(e) => setInput(e.target.value)} disabled={!fuse}></input>
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