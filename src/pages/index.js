import styles from "@/styles/pages/index.module.scss";
import Head from "next/head";
import ButtonLink from "@/components/button-link";
import Hero from "@/layout/home/hero";
import Gallery from "@/layout/home/gallery";

export default function Home() {

    return (
        <>
            <Head>
                <title>ShinyReads: Tu biblioteca de confianza</title>
                <meta name="description" content="Goodreads alternative" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Hero />
                <Gallery />
                <h1>Hola bebe</h1>
                <ButtonLink url="/libro/rtyrtyrtyrty">Ver libro de prueba 1</ButtonLink>
                <ButtonLink url="/libro/libro-de-prueba-2/">Ver libro de prueba 2</ButtonLink>
            </main>
        </>
    );
}
