import Header from "./header";
import { getSession, getSession_auth, isAuth } from "@/controller/database/user";
import { Context } from "@/utils/context";
import { useEffect, useState } from "react";
import { Nunito_Sans, Salsa, Source_Serif_4 } from 'next/font/google'
import Modal from "@/components/modal";
import GoogleButton from "@/components/google-button";

const salsa = Source_Serif_4({ subsets: ['latin'], weight: ["400", "500", "600", "700"], variable: "--font-serif" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export default function Layout({ children }) {

    const [userId, setUserId] = useState(null);
    const [signInModal, setSignInModal] = useState(false);

    useEffect(() => {
        async function getSession() {
            const { user } = await getSession_auth();
            if (user && user.id) {
                setUserId(user.id);
            } else {
                setUserId(undefined);
            }
        }

        getSession();
    }, []);

    return (
        <Context.Provider value={{ ... { userId, setSignInModal } }}>
            <main className={`${salsa.variable} ${nunitoSans.className}`}>
                <Header />
                {children}
            </main>
            <Modal {...{ show: signInModal, setShow: setSignInModal, important: true }}>
                <p>Iniciar sesión en Shiny Reads</p>
                <GoogleButton />
            </Modal>
        </Context.Provider>
    )
}