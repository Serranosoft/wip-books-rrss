import Header from "./header";
import { getSession, isAuth } from "@/controller/database/user";
import { Context } from "@/utils/context";
import { useEffect, useState } from "react";
import { Nunito_Sans, Salsa } from 'next/font/google'
import Modal from "@/components/modal";
import GoogleButton from "@/components/google-button";

const salsa = Salsa({ subsets: ['latin'], weight: ["400"], variable: "--font-salsa" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export default function Layout({ children }) {

    const [userId, setUserId] = useState(null);
    const [signInModal, setSignInModal] = useState(false);

    useEffect(() => {
        async function handleUser() {
            const { user } = await getSession();
            if (user && user.id) {
                setUserId(user.id);
            } else {
                setUserId(undefined);
            }
        }

        handleUser();
    }, []);

    return (
        <Context.Provider value={{ ... { userId, setSignInModal } }}>
            <main className={`${salsa.variable} ${nunitoSans.className}`}>
                <Header />
                {children}
            </main>
            <Modal {...{ show: signInModal, setShow: setSignInModal, important: true }}>
                <p>Iniciar sesión en Yummy Reads</p>
                <GoogleButton />
            </Modal>
        </Context.Provider>
    )
}