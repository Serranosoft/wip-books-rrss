
import styles from "@/styles/layout/header.module.scss";
import Search from "@/components/search";
import { isAuth, login, logout } from "@/controller/database/user";
import { useEffect, useState } from "react";
import Button from "@/components/button";

export default function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const auth = await isAuth();
            setIsAuthenticated(auth);
        }
        checkAuth();
    }, []);

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