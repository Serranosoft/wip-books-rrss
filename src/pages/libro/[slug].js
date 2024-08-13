import Rating from "@/components/rating";
import { getAllSlugs, getBookBySlug } from "@/controller/cms/books";
import { getAllReviewsById_db } from "@/controller/database/reviews";
import Reviews from "@/layout/books/reviews";
import { useEffect, useState } from "react";

export default function book({ data, reviewsData }) {

    const [bookId, setBookId] = useState(null);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        if (data) {
            function handleBook() { setBookId(data.postId) };
            handleBook();
        }
    }, [data])

    return (
        <>
            <div>
                <h1>Libro: {data.title}</h1>
                {rating && <Rating initialStars={rating} big={true} isInteractive={false} />}
                <hr></hr>
                <h3>Opiniones de los usuarios</h3>
                <Reviews {...{ bookId, reviewsData, setRating }} />
            </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const allPosts = await getAllSlugs("book");
    return {
        paths: allPosts.edges.map(({ node }) => `/libro/${node.slug}`),
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const data = await getBookBySlug(context.params.slug);
    const reviewsData = await getAllReviewsById_db({ bookId: data.postId });
    return {
        props: { data, reviewsData }
    };
}