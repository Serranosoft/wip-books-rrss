import Head from "next/head";
import styles from "@/styles/home.module.scss";

export default function Home() {
    return (
        <>
            <Head>
                <title>Goodreads alternative</title>
                <meta name="description" content="Goodreads alternative" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main}`}>
                <h1>Hola bebe</h1>
            </main>
        </>
    );
}
