import { addReview, getAllReviewsById } from "@/controller/database/reviews";
import { useState } from "react";
import Rating from "./rating";

export default function AddReviewElement({ bookId, userId, setReviews, orderReviewsByCurrentUser }) {

    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    async function addNewReview({ content, rating, bookId, userId }) {
        await addReview({ content, rating, bookId, userId });
        onReviewAdd();
    }

    async function onReviewAdd() {
        const newReviews = await getAllReviewsById({ bookId });
        const reviews_sorted = orderReviewsByCurrentUser(newReviews);
        setReviews(reviews_sorted);
    }

    return (
        <>
            <div>
                <textarea style={{ width: 250, height: 250, background: "lightgray" }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <div>
                    <p>Valoración</p>
                    <Rating {...{ setRating }} />
                </div>
                <button onClick={() => addNewReview({ content, rating, bookId, userId })}>añadir review</button>
            </div>
        </>
    )
}