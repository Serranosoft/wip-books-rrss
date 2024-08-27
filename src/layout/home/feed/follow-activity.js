import { getFollowsActivity_db } from "@/controller/database/activity";
import { formatFollow } from "@/utils/activity";
import { useEffect, useState } from "react";

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
        setFollowActivity(follows);
    }

    return (
        <div>
            {
                followActivity.length > 0 &&
                <div>
                    {followActivity.map((follow) => <div dangerouslySetInnerHTML={{ __html: follow }}></div>)}
                </div>
            }
        </div>
    )
}