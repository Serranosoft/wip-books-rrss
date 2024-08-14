import { getTotalRatingsById_db, getTotalReviewsById_db } from "@/controller/database/reviews";
import styles from "@/styles/components/score.module.scss";
import { useEffect, useState } from "react";

export default function Score({ bookId, rating }) {

    const [reviews, setReviews] = useState(null);
    const [ratings, setRatings] = useState(null);

    useEffect(() => {
        async function getReviews() {
            if (bookId) {
                const reviews = await getTotalReviewsById_db({ bookId });
                const ratings = await getTotalRatingsById_db({ bookId });
                setReviews(reviews);
                setRatings(ratings);
            }
        }
        getReviews();
    }, [bookId, rating])


    return (
        <div className={styles.parent}>
            <span className={styles.score}>{rating.value}</span>
            { ratings && <span className="muted">{ratings} rating</span> }
            { reviews && <span className="muted">{reviews} reviews</span> }
        </div>
    )
}