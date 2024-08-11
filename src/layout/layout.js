import Header from "./header";
import { getSession, isAuth } from "@/controller/database/user";
import { Context } from "@/utils/context";
import { useEffect, useState } from "react";

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
        <Context.Provider value={{... { userId }}}>
            <Header />
            {children}
        </Context.Provider>
    )
}