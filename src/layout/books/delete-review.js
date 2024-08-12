import Modal from "@/components/modal";
import { deleteReview_db } from "@/controller/database/reviews";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function DeleteReviewElement({ reviewId, reviews, setReviews, setUserReviewed }) {

    const [show, setShow] = useState(false);

    async function deleteReview() {
        await deleteReview_db({ reviewId });
        onReviewDeleted();
        setShow(false);
    }

    function onReviewDeleted() {
        const copy = [...reviews];
        const items = copy.filter((review) => review.id !== reviewId);
        setUserReviewed(false);
        setReviews(items);
    }

    return (
        <>
            <MdDelete onClick={() => setShow(true)} />
            <Modal {...{ show, setShow }}>
                <div>
                    <p>¿Estás seguro que deseas eliminar esta review?</p>
                    <button onClick={deleteReview}>Si</button>
                    <button onClick={() => setShow(false)}>No</button>
                </div>
            </Modal>
        </>
    )
}