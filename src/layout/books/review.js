import { getTotalRating } from "@/utils/rating";
import { EditReview } from "./edit-review";
import DeleteReviewElement from "./delete-review";
import Link from "next/link";
import Rating from "@/components/rating";

export default function Review({ review, reviews, setReviews, userId, setUserReviewed }) {

    /** Según una review recibida me indica si corresponde al usuario actual o no */
    const isMyReview = (review) => { return review.users.id === userId }

    return (
        <div key={review.id}>
            <Link href={`/usuario/${review.users.slug}`}><h2>{review.users.name}</h2></Link>
            <Link href={`/usuario/${review.users.slug}`}><img src={review.users.image} referrerPolicy="no-referrer" /></Link>
            <Rating isInteractive={false} initialStars={getTotalRating([review.rating])} />
            {isMyReview(review) && <EditReview {...{ reviewId: review.id, userId, setReviews, reviews }} />}
            {isMyReview(review) && <DeleteReviewElement {...{ reviewId: review.id, setReviews, reviews, setUserReviewed }} />}
            <p>{review.content} - <span> puntuación: {review.rating}</span></p>
        </div>
    )
}