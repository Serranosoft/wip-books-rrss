
import styles from "@/styles/layout/header.module.scss";
import Search from "@/components/search";
import { getAvatar, login, logout } from "@/controller/database/user";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/button";
import { Context } from "@/utils/context";
import Modal from "@/components/modal";
import GoogleButton from "@/components/google-button";
import UserProfile from "@/components/user-profile";
import { Menu, MenuItem } from '@szhsin/react-menu';
import "@szhsin/react-menu/dist/index.css";
export default function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [signInModal, setSignInModal] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const { userId } = useContext(Context);

    useEffect(() => {
        async function getUserAvatar() {
            const result = await getAvatar({ id: userId });
            setAvatar(result[0].image)
        }
        if (userId) {
            setIsAuthenticated(true);
            getUserAvatar();
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
                {
                    !isAuthenticated ?
                        <Button onClick={() => setSignInModal(true)}>Iniciar sesión</Button>
                        :
                        <Menu menuButton={
                            <div className={styles.avatarWrapper}>
                                {avatar ? <img src={avatar} referrerpolicy="no-referrer" /> : <UserProfile />}
                            </div>
                        }>
                            <MenuItem>Mi cuenta (Work in progress...)</MenuItem>
                            <MenuItem onClick={logoutUser}>Cerrar sesión</MenuItem>
                        </Menu>

                }
            </header>
            <Modal {...{ show: signInModal, setShow: setSignInModal }}>
                <p>Iniciar sesión en Yummy Reads</p>
                <GoogleButton />
            </Modal>
        </>
    )

}