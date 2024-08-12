import Layout from "@/layout/layout";
import "@/styles/globals.scss";
import "@/styles/headings.scss";

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>

    )
}