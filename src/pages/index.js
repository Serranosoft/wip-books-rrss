import Head from "next/head";
import Landing from "@/layout/home/landing";
import { useContext } from "react";
import { Context } from "@/utils/context";
import Feed from "@/layout/home/feed";

export default function Home() {

    const { userId } = useContext(Context);

    return (
        <>
            <Head>
                <title>ShinyReads: Tu biblioteca de confianza</title>
                <meta name="description" content="Goodreads alternative" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {userId ? <Feed /> : <Landing />}
        </>
    );
}
