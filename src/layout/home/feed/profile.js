import styles from "@/styles/layout/home/feed/profile.module.scss";
import Avatar from "@/components/avatar";
import ButtonLink from "@/components/button-link";
import { Context } from "@/utils/context";
import { useContext, useEffect, useState } from "react";
import { getFollowersQty_db, getFollowingQty_db } from "@/controller/database/followers";

export default function Profile({ userId }) {

    const { avatar, name, slug } = useContext(Context);

    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    useEffect(() => {
        if (userId) {
            getFollowersQty();
            getFollowingQty();
        }
    }, [userId])

    async function getFollowersQty() {
        const result = await getFollowersQty_db({ userId });
        setFollowers(result);
    }

    async function getFollowingQty() {
        const result = await getFollowingQty_db({ userId });
        setFollowing(result);
    }

    return (
        <div className={`${styles.card} ${styles.profileCard}`}>
            <Avatar src={`${avatar}`} />
            <span className={styles.name}>{name}</span>
            <ButtonLink url={`/usuario/${slug}`}>Editar perfil</ButtonLink>

            <div className={styles.metadata}>
                <span className={styles.title}>Mis datos</span>
                <div>
                    <span>Seguidores:</span>
                    <span>{followers}</span>
                </div>
                <div>
                    <span>Siguiendo:</span>
                    <span>{following}</span>
                </div>
            </div>
        </div>
    )
}