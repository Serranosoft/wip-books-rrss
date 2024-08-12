import Modal from "@/components/modal";
import Rating from "@/components/rating";
import { editReview_db } from "@/controller/database/reviews";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export function EditReview({ reviewId, reviews, setReviews }) {
    
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    async function editReview() {
        await editReview_db({ reviewId, content, rating });
        onReviewEdit();
        setShow(false);
    }

    function onReviewEdit() {
        const copy = [...reviews];
        const item = reviews.find((review) => review.id === reviewId);
        item.content = content;
        item.rating = rating;
        setReviews(copy);
    }

    return (
        <>
            <MdEdit onClick={() => setShow(true)} />
            <Modal {... { show, setShow }}>
                <p>Editar review</p>
                <textarea style={{ width: 250, height: 250, background: "lightgray" }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <div>
                    <p>Valoración</p>
                    <Rating {...{ setRating }} />
                </div>
                <button onClick={editReview}>Actualizar review</button>
            </Modal>
        </>
    )
}