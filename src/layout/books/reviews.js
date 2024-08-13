import AddReviewElement from "@/components/add-review";
import { Context } from "@/utils/context";
import { getTotalRating } from "@/utils/rating";
import { useContext, useEffect, useState } from "react";
import Review from "./review";

export default function Reviews({ bookId, reviewsData, setRating }) {

    const { userId } = useContext(Context);
    const [reviews, setReviews] = useState([]);
    const [userReviewed, setUserReviewed] = useState(null);

    /** Ordenar reviews */
    useEffect(() => {
        if (reviewsData && userId !== null) {
            let reviews_sorted = [];
            if (userId) {
                reviews_sorted = orderReviewsByCurrentUser(reviewsData);
            } else {
                reviews_sorted = reviewsData;
            }
            setReviews(reviews_sorted);
        }
    }, [reviewsData, userId]);

    /** Cuando se añade una review se actualiza el rating total del libro */
    useEffect(() => {
        if (reviews.length > 0) calculateRating();
    }, [reviews]);

    /** Calcula el rating nuevo después de que el usuario ha escrito una nueva review */
    function calculateRating() {
        const rating = getTotalRating(reviews.map((review) => review.rating));
        setRating(rating);
    }

    /** Encargado de ordenar las reviews para que se muestre la review del primer usuario arriba del todo */
    function orderReviewsByCurrentUser(reviews) {
        const copy = [...reviews];
        copy.sort((a, b) => {
            if (a.users.id === userId) return -1;
            if (b.users.id === userId) return 1;
            return 0;
        });

        return copy;
    }

    return (
        <>
            { reviews.map((review) => <Review {...{ review, reviews, userId, setReviews, setUserReviewed }} />) }
            <AddReviewElement {... { userId, bookId, setReviews, orderReviewsByCurrentUser, setUserReviewed, userReviewed }} />
        </>
    )
}