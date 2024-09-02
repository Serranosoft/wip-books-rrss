import styles from "@/styles/layout/home/feed/activity.module.scss";
import { getReviewsActivity_db } from "@/controller/database/activity";
import { formatReview } from "@/utils/activity";
import { useEffect, useState } from "react";
import { MdBookmarks, MdSupervisorAccount } from "react-icons/md";
import Avatar from "@/components/avatar";

export default function ReviewActivity({ following }) {

    /** Actividad de reviews de los usuarios que estoy siguiendo */
    const [reviewActivity, setReviewActivity] = useState([]);

    /** Obtener array con las últimas reviews de los usuarios que estoy siguiendo */
    useEffect(() => {
        if (following && following.length > 0) getReviewsActivity();
    }, [following])

    /** Por cada review escrita formatear el resultado para mostrar al usuario */
    async function getReviewsActivity() {
        const result = await getReviewsActivity_db({ following });
        const reviews = [];
        result.forEach((review) => reviews.push(formatReview(review)));
        setReviewActivity(reviews);
    }

    return (
        <>
            {
                reviewActivity.map((review) => {
                    return (
                        <div className={styles.activity}>

                            <div className={styles.content}>
                                <div className={styles.header}>
                                    <Avatar src={review.avatar} />
                                    <div className={styles.info}>
                                        <span className={styles.name}>{review.user}</span>
                                        <span className={styles.title}>{review.userTitle || "(Sin título)"}</span>
                                    </div>
                                </div>
                                <span className={styles.description} dangerouslySetInnerHTML={{ __html: review.activity }}></span>
                                <div className={styles.actions}>
                                    <a href={`/usuario/${review.userSlug}`}>
                                        <MdSupervisorAccount size={30} color={"#5f5f5f"} />
                                        <span>Ver perfil</span>
                                    </a>
                                    <a href={review.bookUrl}>
                                        <MdBookmarks size={30} color={"#5f5f5f"} />
                                        <span>Ver libro</span>
                                    </a>
                                </div>
                            </div>

                            <div className={styles.book}>
                                <a href={review.bookUrl}>
                                    <img src={review.book} />
                                </a>
                            </div>

                        </div>
                    )
                })

            }
        </>
    )
}