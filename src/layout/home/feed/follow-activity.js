import styles from "@/styles/layout/home/feed/activity.module.scss";
import { getFollowsActivity_db } from "@/controller/database/activity";
import { formatFollow } from "@/utils/activity";
import { useEffect, useState } from "react";
import { MdSupervisorAccount } from "react-icons/md";

export default function FollowActivity({ following }) {

    /** Actividad de reviews de los usuarios que estoy siguiendo */
    const [followActivity, setFollowActivity] = useState([]);

    /** Obtener array con los últimos follows que han hecho los usuarios que estoy siguiendo */
    useEffect(() => {
        if (following && following.length > 0) getReviewsActivity();
    }, [following])

    /** Por cada follow que haya hecho el usuario se formatea una cadena de texto para mostrarlo como actividad */
    async function getReviewsActivity() {
        const result = await getFollowsActivity_db({ following });
        const follows = [];
        result.forEach((follow) => follows.push(formatFollow(follow)));
        console.log(follows);
        setFollowActivity(follows);
    }
    return (
        <>
            {
                followActivity.map((follow) => {
                    return (
                        <div className={styles.activity}>
                            <div className={styles.content}>
                                <div dangerouslySetInnerHTML={{ __html: follow.activity }}></div>
                                <div className={styles.actions}>
                                    <a href={`/usuario/${follow.user}`}>
                                        <MdSupervisorAccount size={30} color={"#5f5f5f"} />
                                        <span>Ver perfil</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}