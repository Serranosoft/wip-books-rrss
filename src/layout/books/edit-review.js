import Modal from "@/components/modal";
import Rating from "@/components/rating";
import { editReview_db } from "@/controller/database/reviews";
import { useEffect, useState } from "react";

export function EditReview({ review, reviews, setReviews, userId }) {
    
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(review.rating);

    useEffect(() => {
        setContent(review.content);
    }, [review])

    async function editReview() {
        await editReview_db({ reviewId: review.id, content, rating });
        onReviewEdit();
        setShow(false);
    }

    function onReviewEdit() {
        const copy = [...reviews];
        const item = reviews.find((element) => element.id === review.id);
        item.content = content;
        item.rating = rating;
        setReviews(copy);
    }
    
    // WIP: Validate() and show errors when rating or content less than 1

    return (
        <>
            <button onClick={() => setShow(true)}>{review.content.length > 0 ? "Cambiar valoración" : "Escribir una valoración"}</button>
            <Modal {... { show, setShow }}>
                <p>{review.content.length > 0 ? "Cambiar valoración" : "Escribir una valoración"}</p>
                <textarea style={{ width: 250, height: 250, background: "lightgray" }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <div>
                    <p>Valoración</p>
                    <Rating {...{ initialStars: rating, setRating, userId }} />
                </div>
                <button onClick={editReview}>Actualizar review</button>
            </Modal>
        </>
    )
}