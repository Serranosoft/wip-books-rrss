
import styles from "@/styles/layout/header.module.scss";
import Search from "@/components/search";
import { login, logout } from "@/controller/database/user";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/button";
import { Context } from "@/utils/context";

export default function Header() {

    const { userId } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (userId) {
            setIsAuthenticated(isAuthenticated);
        }
    }, [userId])

    async function logoutUser() {
        await logout();
        setIsAuthenticated(false);
    }

    async function loginUser() { login() }

    return (

        <header className={`${styles.header}`}>
            <img src="/img/YummyReads.png"></img>
            <Search />
            <Button onClick={!isAuthenticated ? loginUser : logoutUser}>{ !isAuthenticated ? "Iniciar sesión" : "Cerrar sesión" }</Button>
        </header>
    )

}