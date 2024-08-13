import { getTotalReviewsById_db } from "@/controller/database/reviews";
import styles from "@/styles/components/score.module.scss";
import { useEffect, useState } from "react";

export default function Score({ bookId, rating }) {

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        async function getReviews() {
            if (bookId) {
                const reviews = await getTotalReviewsById_db({ bookId });
                setReviews(reviews);
            }
        }
        getReviews();
    }, [bookId])


    return (
        <div className={styles.parent}>
            <span className={styles.score}>{rating}</span>
            { reviews && <span className={styles.reviews}>{reviews} rating</span> }
            { reviews && <span className={styles.reviews}>{reviews} reviews</span> }
        </div>
    )
}