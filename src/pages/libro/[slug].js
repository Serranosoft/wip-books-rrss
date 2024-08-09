import AddReviewElement from "@/components/add-review";
import Rating from "@/components/rating";
import { getAllSlugs, getBookBySlug } from "@/controller/cms/books";
import { getAllReviewsById } from "@/controller/database/reviews";
import { getSession } from "@/controller/database/user";
import { getTotalRating } from "@/utils/rating";
import { useEffect, useState } from "react";

export default function book({ data, reviewsData }) {

    const [reviews, setReviews] = useState([]);

    const [userId, setUserId] = useState(null);
    const [bookId, setBookId] = useState(null);
    const [rating, setRating] = useState(null);

    /** Constructor */
    useEffect(() => {
        async function handleUser() {
            const id = await getUserId();
            setUserId(id);
        }
        
        function handleBook() { setBookId(data.postId) };
        function handleReviews() { setReviews(reviewsData) };
        
        handleUser();
        handleBook();
        handleReviews();
    }, [])

    /** Cuando una review cambia actualiza el rating*/
    useEffect(() => {
        if (reviews.length > 0) {
            handleRating();
        }
    }, [reviews])
    
    async function onReviewAdd() {
        const newReviews = await getAllReviewsById({ bookId: data.postId });
        setReviews(newReviews);
    }
    
    async function getUserId() {
        const { user } = await getSession();
        return user.id;
    }

    function handleRating() {
        const rating = getTotalRating(reviews.map((review) => review.rating));
        setRating(rating);
    }

    return (
        <>
            <div>
                <h1>Libro: {data.title}</h1>
                { rating && <Rating initialStars={rating} big={true} isInteractive={false} /> }
                <hr></hr>
                <h3>Opiniones de los usuarios</h3>
                {
                    reviews.map((review) =>
                        <div key={review.id}>
                            <h2>{review.users.name}</h2>
                            <img src={review.users.image} />
                            <Rating isInteractive={false} initialStars={getTotalRating([review.rating])} />
                            <p>{review.content} - <span> puntuación: {review.rating}</span></p>
                        </div>
                    )
                }
                {userId && bookId && <AddReviewElement {... { userId, bookId: data.postId, onReviewAdd }} />}

            </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const allPosts = await getAllSlugs("book");
    return {
        paths: allPosts.edges.map(({ node }) => `/libro/${node.slug}`),
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const data = await getBookBySlug(context.params.slug);
    const reviewsData = await getAllReviewsById({ bookId: data.postId });
    return {
        props: { data, reviewsData }
    };
}