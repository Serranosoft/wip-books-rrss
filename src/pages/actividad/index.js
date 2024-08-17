import { getFollowing_db } from "@/controller/database/followers";
import { Context } from "@/utils/context";
import { useContext, useEffect, useState } from "react"
import { getReviewsActivity_db } from "@/controller/database/activity";
import { formatReview } from "@/utils/activity";

export default function Actividad() {

    const { userId } = useContext(Context);

    /** Usuarios que estoy siguiendo */
    const [following, setFollowing] = useState([]);
    /** Actividad de reviews de los usuarios que estoy siguiendo */
    const [reviewActivity, setReviewActivity] = useState([]);

    /** Obtener array de ids con usuarios que estoy siguiendo */
    useEffect(() => {
        if (userId) getFollowingUsersId();
    }, [userId])

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

    /** Obtener array de ids con usuarios que estoy siguiendo */
    async function getFollowingUsersId() {
        const result = await getFollowing_db({ userId });
        setFollowing(result);
    }

    return (
        <div>
            <h1>Hola</h1>
            {
                reviewActivity.length > 0 &&
                <>
                    <h2>Últimas reseñas escritas por tus seguidos</h2>
                    {reviewActivity.map((review) => <div dangerouslySetInnerHTML={{ __html: review }}></div>)}
                </>
            }

        </div>
    )
}