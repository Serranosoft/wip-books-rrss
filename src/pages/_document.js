import Header from "@/layout/header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <script src="https://accounts.google.com/gsi/client" async></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
