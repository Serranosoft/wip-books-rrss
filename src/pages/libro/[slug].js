import { getAllSlugs, getBookBySlug } from "@/controller/cms/books";
import { getAllReviewsById } from "@/controller/database/reviews";
import { getTotalRating } from "@/utils/rating";

export default function book({ data, reviews }) {
    console.log(data);
    console.log(reviews);
    return (
        <>
            <div>
                <h1>Libro: {data.title}</h1>
                <h2>Puntuación total: { getTotalRating(reviews.map((review) => review.rating)) }</h2>
                <p>--Reviews--</p>

                {
                    reviews.map((review) =>
                        <p>{review.content} - <span> puntuación: {review.rating}</span></p>
                    )
                }
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
    const reviews = await getAllReviewsById({ bookId: data.postId });
    return {
        props: { data, reviews }
    };
}