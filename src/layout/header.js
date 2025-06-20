
import styles from "@/styles/layout/header.module.scss";
import Search from "@/components/search";
import { getUserInfo_db, logout_auth } from "@/controller/database/user";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/button";
import { Context } from "@/utils/context";
import UserProfile from "@/components/user-profile";
import { Menu, MenuDivider, MenuItem } from '@szhsin/react-menu';
import "@szhsin/react-menu/dist/index.css";
import Link from "next/link";
import Avatar from "@/components/avatar";
export default function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    /* const [signInModal, setSignInModal] = useState(false); */
    // const [avatar, setAvatar] = useState(null);
    // const [name, setName] = useState(null);
    // const [slug, setSlug] = useState(null);
    const { userId, avatar, name, slug, setSignInModal } = useContext(Context);

    useEffect(() => {
        if (userId) setIsAuthenticated(true);
    }, [userId])

    async function logoutUser() {
        await logout_auth();
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
                                    {avatar ? <Avatar src={avatar} /> : <UserProfile />}
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