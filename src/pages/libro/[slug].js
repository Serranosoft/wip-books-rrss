import AddReviewElement from "@/components/add-review";
import { getAllSlugs, getBookBySlug } from "@/controller/cms/books";
import { getAllReviewsById } from "@/controller/database/reviews";
import { getSession } from "@/controller/database/user";
import { getTotalRating } from "@/utils/rating";
import { useEffect, useState } from "react";

export default function book({ data, reviewsData }) {

    const [reviews, setReviews] = useState([]);
    
    const [userId, setUserId] = useState(null);
    const [bookId, setBookId] = useState(null);
    
    useEffect(() => {
        async function getUserId() {
            const { user } = await getSession();
            return user.id;
        }

        async function fetchData() {
            const id = await getUserId(); 
            setUserId(id);
            setBookId(data.postId); 
        }

        fetchData();

        if (reviewsData && reviewsData.length > 0) {
            setReviews(reviewsData);
        }
    }, [])

    async function onReviewAdd() {
        const newReviews = await getAllReviewsById({ bookId: data.postId });
        setReviews(newReviews);
    }


    return (
        <>
            <div>
                <h1>Libro: {data.title}</h1>
                <h2>Puntuación total: { getTotalRating(reviews.map((review) => review.rating)) }</h2>
                <hr></hr>
                <h3>Opiniones de los usuarios</h3>
                {
                    reviews.map((review) =>
                        <div>
                            <h2>{review.users.name}</h2>
                            <img src={review.users.image} />
                            <p>{review.content} - <span> puntuación: {review.rating}</span></p>
                        </div>
                    )
                }
                { userId && bookId && <AddReviewElement {... { userId, bookId: data.postId, onReviewAdd }}/> }
                
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