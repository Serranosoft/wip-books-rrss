import { getReviewsActivity_db } from "@/controller/database/activity";
import { formatReview } from "@/utils/activity";
import { useEffect, useState } from "react";

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
        <div>
            {
                reviewActivity.length > 0 &&
                <div>
                    {reviewActivity.map((review) => <div dangerouslySetInnerHTML={{ __html: review }}></div>)}
                </div>
            }
        </div>
    )
}