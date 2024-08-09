import { addReview } from "@/controller/database/reviews";
import { useState } from "react";

export default function AddReviewElement({ bookId, userId, onReviewAdd }) {

    const rating = 2.5;
    const [content, setContent] = useState("");


    async function addNewReview({ content, rating, bookId, userId }) {
        await addReview({ content, rating, bookId, userId });
        onReviewAdd();
    }

    return (
        <>
            <div>
                <textarea style={{ width: 250, height: 250, background: "lightgray" }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button onClick={() => addNewReview({ content, rating, bookId, userId })}>añadir review</button>
            </div>
        </>
    )
}