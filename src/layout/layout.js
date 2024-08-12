import Header from "./header";
import { getSession, isAuth } from "@/controller/database/user";
import { Context } from "@/utils/context";
import { useEffect, useState } from "react";
import { Nunito_Sans, Salsa } from 'next/font/google'

const salsa = Salsa({ subsets: ['latin'], weight: ["400"], variable: "--font-salsa" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export default function Layout({ children }) {

    const [userId, setUserId] = useState(null);

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
        <Context.Provider value={{ ... { userId } }}>
            <style jsx global>{`
                html {
                  font-family: ${nunitoSans.className};
                }
            `}</style>
            <Header />
            <main className={salsa.variable}>
                {children}
            </main>
        </Context.Provider>
    )
}