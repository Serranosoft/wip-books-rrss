import styles from "@/styles/layout/home/feed/index.module.scss";
import { getFollowing_db } from "@/controller/database/followers";
import { Context } from "@/utils/context";
import { useContext, useEffect, useState } from "react"
import ButtonLink from "@/components/button-link";
import ReviewActivity from "./review-activity";
import FollowActivity from "./follow-activity";
import Profile from "./profile";

export default function Feed() {

    const { userId } = useContext(Context);

    /** Usuarios que estoy siguiendo */
    const [following, setFollowing] = useState([]);

    /** Obtener array de ids con usuarios que estoy siguiendo */
    useEffect(() => {
        if (userId) getFollowingUsersId();
    }, [userId])

    /** Obtener array de ids con usuarios que estoy siguiendo */
    async function getFollowingUsersId() {
        const result = await getFollowing_db({ userId });
        setFollowing(result);
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <aside>
                    <Profile {...{ userId }} />
                </aside>
                <section>
                    <ReviewActivity {...{ following }} />
                    <FollowActivity {...{ following }} />
                    <ButtonLink url="/libro/rtyrtyrtyrty">Ver más</ButtonLink>
                    <ButtonLink url="/libro/Librooooo">Ver más</ButtonLink>
                </section>
            </div>
        </main>
    )
}