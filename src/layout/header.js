
import styles from "@/styles/layout/header.module.scss";
import Search from "@/components/search";
import { getAvatar, getUserInfo, getUserInfo_db, login, logout } from "@/controller/database/user";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/button";
import { Context } from "@/utils/context";
import Modal from "@/components/modal";
import GoogleButton from "@/components/google-button";
import UserProfile from "@/components/user-profile";
import { Menu, MenuDivider, MenuItem } from '@szhsin/react-menu';
import "@szhsin/react-menu/dist/index.css";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    /* const [signInModal, setSignInModal] = useState(false); */
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);
    const [slug, setSlug] = useState(null);
    const { userId, setSignInModal } = useContext(Context);

    useEffect(() => {
        async function getUserInfo() {
            const result = await getUserInfo_db({ id: userId });
            setAvatar(result[0].image)
            setName(result[0].name)
            setSlug(result[0].slug)
        }
        if (userId) {
            setIsAuthenticated(true);
            getUserInfo();
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
                        <div className={styles.userMenu}>
                            <Menu menuButton={
                                <div className={styles.avatarWrapper}>
                                    {avatar ? <img src={avatar} referrerPolicy="no-referrer" /> : <UserProfile />}
                                </div>
                            }>
                                <span>{name}</span>
                                <MenuItem><Link href={`/usuario/${slug}`}>Mi cuenta (Work in progress...)</Link></MenuItem>
                                <MenuDivider />

                                <MenuItem>Ajustes (Work in progress...)</MenuItem>
                                <MenuItem onClick={logoutUser}>Cerrar sesión</MenuItem>
                            </Menu>
                        </div>

                }
            </header>
            {/* <Modal {...{ show: signInModal, setShow: setSignInModal }}>
                <p>Iniciar sesión en Yummy Reads</p>
                <GoogleButton />
            </Modal> */}
        </>
    )

}