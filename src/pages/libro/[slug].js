import AddReviewElement from "@/components/add-review";
import Rating from "@/components/rating";
import { getAllSlugs, getBookBySlug } from "@/controller/cms/books";
import { getAllReviewsById } from "@/controller/database/reviews";
import { getSession } from "@/controller/database/user";
import { Context } from "@/utils/context";
import { getTotalRating } from "@/utils/rating";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function book({ data, reviewsData }) {

    const { userId } = useContext(Context);

    const [reviews, setReviews] = useState([]);
    const [bookId, setBookId] = useState(null);
    const [rating, setRating] = useState(null);

    /** Constructor */
    useEffect(() => {        
        function handleBook() { setBookId(data.postId) };
        function handleReviews() { setReviews(reviewsData) };
        
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
                            <Link href={`/usuario/${review.users.slug}`}><h2>{review.users.name}</h2></Link>
                            <Link href={`/usuario/${review.users.slug}`}><img src={review.users.image} /></Link>
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