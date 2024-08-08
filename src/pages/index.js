import AddReviewElement from "@/components/add-review";
import styles from "@/styles/home.module.scss";
import Button from "@/components/button";
import Head from "next/head";

export default function Home() {

    return (
        <>
            <Head>
                <title>YummyReads: Tu biblioteca de confianza</title>
                <meta name="description" content="Goodreads alternative" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Hola bebe</h1>
                <Button url="/libro/rtyrtyrtyrty">Ver libro de prueba 1</Button>
                <Button url="/libro/libro-de-prueba-2/">Ver libro de prueba 2</Button>
                <AddReviewElement />
            </main>
        </>
    );
}
