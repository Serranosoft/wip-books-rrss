import { addReview } from "@/controller/database/reviews";
import { useState } from "react";
import Rating from "./rating";

export default function AddReviewElement({ bookId, userId, onReviewAdd }) {

    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    async function addNewReview({ content, rating, bookId, userId }) {
        await addReview({ content, rating, bookId, userId });
        onReviewAdd();
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