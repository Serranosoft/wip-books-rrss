import { addReview_db, getAllReviewsById_db, userReviewedBookId_db } from "@/controller/database/reviews";
import { useContext, useEffect, useState } from "react";
import Rating from "./rating";
import { Context } from "@/utils/context";

export default function AddReviewElement({ bookId, userId, setReviews, orderReviewsByCurrentUser, setUserReviewed, userReviewed }) {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const { setSignInModal } = useContext(Context);

    /** Saber si el usuario ha escrito una review */
    useEffect(() => {
        if (bookId && userId) hasUserReviewed();
    }, [bookId, userId]);

    /** Devuelve true/false dependiendo si el usuario ha escrito o no una review */
    async function hasUserReviewed() {
        const reviewed = await userReviewedBookId_db({ bookId, userId });
        setUserReviewed(reviewed);
    }

    async function addNewReview({ content, rating, bookId, userId }) {
        if (!userId) {
            setSignInModal(true);
            return;
        } else if (content.length < 1 || rating === 0) {
            return;
        }
        await addReview_db({ content, rating, bookId, userId });
        onReviewAdd();
    }

    async function onReviewAdd() {
        const newReviews = await getAllReviewsById_db({ bookId });
        const reviews_sorted = orderReviewsByCurrentUser(newReviews);
        setReviews(reviews_sorted);
    }

    return (
        <>
            {
                !userId || (userId && (userReviewed !== null && userReviewed === false)) ?
                <div>
                    <textarea style={{ width: 250, height: 250, background: "lightgray" }} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    <div>
                        <p>Valoración</p>
                        <Rating {...{ setRating, userId }} />
                    </div>
                    <button onClick={() => addNewReview({ content, rating, bookId, userId })}>añadir review</button>
                </div>
                : <></>
            }
        </>
    )
}