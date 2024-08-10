
import styles from "@/styles/layout/header.module.scss";
import Search from "@/components/search";
import { login, logout } from "@/controller/database/user";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/button";
import { Context } from "@/utils/context";
import Modal from "@/components/modal";
import GoogleButton from "@/components/google-button";

export default function Header() {

    const { userId } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [signInModal, setSignInModal] = useState(false);

    useEffect(() => {
        if (userId) {
            setIsAuthenticated(isAuthenticated);
        }
    }, [userId])

    async function logoutUser() {
        await logout();
        setIsAuthenticated(false);
    }

    return (
        <>
            <header className={`${styles.header}`}>
                <img src="/img/YummyReads.png"></img>
                <Search />
                <Button onClick={!isAuthenticated ? () => setSignInModal(true) : logoutUser}>{ !isAuthenticated ? "Iniciar sesión" : "Cerrar sesión" }</Button>
            </header>
            <Modal {...{ show: signInModal, setShow: setSignInModal }}>
                <p>Iniciar sesión en Yummy Reads</p>
                <GoogleButton onClick={login} />
            </Modal>
        </>
    )

}