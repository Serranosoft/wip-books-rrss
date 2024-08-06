import Header from "@/layout/header";
import Layout from "@/layout/layout";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>

    )
}