import Header from "@/layout/header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="es">
            <Head />
            <body>
                <Header />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
