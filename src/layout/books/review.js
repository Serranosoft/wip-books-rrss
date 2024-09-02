import styles from "@/styles/pages/books/review.module.scss"
import { getTotalRating } from "@/utils/rating";
import { EditReview } from "./edit-review";
import DeleteReviewElement from "./delete-review";
import Link from "next/link";
import Rating from "@/components/rating";
import Follow from "./follow";
import Avatar from "@/components/avatar";

export default function Review({ review, reviews, setReviews, userId, setUserReviewed }) {

    /** Según una review recibida me indica si corresponde al usuario actual o no */
    const isMyReview = (review) => { return review.users.id === userId }

    return (
        
        <div className={styles.container} key={review.id}>
            <div className={styles.user}>
                <Link href={`/usuario/${review.users.slug}`}><Avatar src={review.users.image} /></Link>
                <Link href={`/usuario/${review.users.slug}`}><h2>{review.users.name}</h2></Link>
                <Follow {...{ reviews, review, userId }} />
            </div>
            <div className={styles.review}>
                <Rating isInteractive={false} initialStars={getTotalRating([review.rating])} />
                <span>{review.content}</span>
                {isMyReview(review) && <EditReview {...{ review, userId, setReviews, reviews }} />}
                {isMyReview(review) && <DeleteReviewElement {...{ reviewId: review.id, setReviews, reviews, setUserReviewed }} />}
            </div>
        </div>
    )
}