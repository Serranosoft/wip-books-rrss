import styles from "@/styles/pages/books/[slug].module.scss";
import Rating from "@/components/rating";
import Score from "@/components/score";
import { getAllSlugs, getBookBySlug } from "@/controller/cms/books";
import { getAllReviewsById_db } from "@/controller/database/reviews";
import Reviews from "@/layout/books/reviews";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import StatusButton from "@/layout/books/status-button";

export default function book({ data, reviewsData }) {

    const [bookId, setBookId] = useState(null);
    const [rating, setRating] = useState({ value: null });

    useEffect(() => {
        if (data) {
            function handleBook() { setBookId(data.postId) };
            handleBook();
        }
    }, [data])

    return (
        <>
            {
                data &&

                <div className={styles.parent}>

                    <div className={styles.layout}>

                        <div className={styles.sticky}>
                            <div className={styles.content}>
                                <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1678747712i/117703749.jpg" />
                                <StatusButton {...{ bookId }} />
                                {rating.value && <Rating initialStars={rating.value} big={false} isInteractive={false} />}
                            </div>
                        </div>

                        <div className={styles.container}>
                            <div className={styles.content}>
                                <div className={styles.title}>
                                    <h1>{data.title}</h1>
                                    <span>{data.author || "Marta Bijan"}</span>
                                </div>
                                <div className={styles.rating}>
                                    {rating.value && <Rating initialStars={rating.value} big={false} isInteractive={false} />}
                                    {rating.value && <Score {...{ bookId, rating }} />}
                                </div>
                                <div className={styles.description}>
                                    Sinopsis del libro.....
                                </div>
                                <div className={styles.metadata}>
                                    <div className={styles.group}>
                                        <span className="muted">Generos </span><span className={styles.overflow}>Graphic NovelsYoung AdultComicsMental HealthContemporaryFictionGraphic Novels Comics AdultComicsMental HealthContemporaryFictionGraphic</span>
                                    </div>
                                    <div className={styles.group}>
                                        <span className="muted">247 páginas, Paperback</span>
                                    </div>
                                </div>
                                <div className={styles.reviews}>
                                    <h2>Valoraciones y análisis</h2>
                                    <Reviews {...{ bookId, reviewsData, setRating }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export const getStaticPaths = async () => {
    const allPosts = await getAllSlugs("libro");
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