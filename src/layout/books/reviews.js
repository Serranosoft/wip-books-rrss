import AddReviewElement from "@/components/add-review";
import Rating from "@/components/rating";
import { getAllReviewsById, userReviewedBookId } from "@/controller/database/reviews";
import { Context } from "@/utils/context";
import { getTotalRating } from "@/utils/rating";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { EditReview } from "./edit-review";

export default function Reviews({ bookId, reviewsData, setRating }) {

    const { userId } = useContext(Context);
    const [reviews, setReviews] = useState([]);
    const [userReviewed, setUserReviewed] = useState(null);

    /** Saber si el usuario ha escrito una review */
    useEffect(() => {
        if (bookId && userId) hasUserReviewed();
    }, [bookId, userId]);

    /** Ordenar reviews */
    useEffect(() => {
        console.log(userId);
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

        console.log(reviews);
    }, [reviews]);

    /** Calcula el rating nuevo después de que el usuario ha escrito una nueva review */
    function calculateRating() {
        const rating = getTotalRating(reviews.map((review) => review.rating));
        setRating(rating);
    }

    /** Devuelve true/false dependiendo si el usuario ha escrito o no una review */
    async function hasUserReviewed() {
        const reviewed = await userReviewedBookId({ bookId, userId });
        setUserReviewed(reviewed);
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

    /** Callback que se ejecuta cuando se ha escrito una nueva review */
    async function onReviewAdd() {
        const newReviews = await getAllReviewsById({ bookId });
        const reviews_sorted = orderReviewsByCurrentUser(newReviews);
        setReviews(reviews_sorted);
    }

    return (
        <>
            {
                reviews.map((review) =>
                    <div key={review.id}>
                        <Link href={`/usuario/${review.users.slug}`}><h2>{review.users.name}</h2></Link>
                        <Link href={`/usuario/${review.users.slug}`}><img src={review.users.image} referrerPolicy="no-referrer" /></Link>
                        <Rating isInteractive={false} initialStars={getTotalRating([review.rating])} />
                        { review.users.id === userId && <EditReview {...{ reviewId: review.id, setReviews, reviews }} /> }
                        <p>{review.content} - <span> puntuación: {review.rating}</span></p>
                    </div>
                )
            }
            {

                userId ?
                    userReviewed !== null && userReviewed === false && <AddReviewElement {... { userId, bookId, onReviewAdd }} />
                    :
                    <div>{/* Se mostrará un botón que mostrará el reviewElement si existe userId o se le abrirá el modal de iniciar sesión */}</div>
            }
        </>
    )
}