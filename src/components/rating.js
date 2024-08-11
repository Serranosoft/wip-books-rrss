import styles from "@/styles/components/rating.module.scss";
import { useEffect, useRef, useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";

export const starSize = 50;

export default function Rating({ initialStars = 0, isInteractive = true, big = false, setRating }) {
    const [activeRating, setActiveRating] = useState(initialStars);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const ratingEl = useRef(null);

    useEffect(() => {
        setActiveRating(initialStars);
    }, [initialStars]);

    function calculate(e) {
        const { width, left } = ratingEl.current.getBoundingClientRect(); // Anchura y posición de las estrellas

        let percentPos = (e.clientX - left) / width; // Valor entre 0 y 1 para indicarme cuantas estrellas pintar
        const percentToStars = percentPos * 5; // Convierte el número anterior (0...1) en un valor interpretable entre 0 y 5 (estrellas)
        const nearestNumber = Math.round((percentToStars + 0.5 / 2) / 0.5) * 0.5; // Convierte el valor recibido en el valor mas cercano entre (x) y (x.5)
        return nearestNumber;
    }

    function handleClick(e) {
        if (isInteractive) {
            setIsHovered(false);
            const rating = calculate(e);
            setActiveRating(rating);
            if (setRating) setRating(rating)
        }
    }

    function handleMouseMove(e) {
        if (isInteractive) {
            setIsHovered(true);
            setHoveredRating(calculate(e));
        }
    };

    function handleMouseLeave() {
        if (isInteractive) {
            setHoveredRating(-1);
            setIsHovered(false);
        }
    };

    return (
        <div
            className={styles.rating}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ratingEl}
        >
            {[...new Array(5)].map((_, index) => {
                const stars = isHovered ? hoveredRating : activeRating;
                const emptyStar = stars === 0 || stars < index + 1;

                const isActiveRating = stars !== 1;
                const isRatingWithPrecision = stars % 1 !== 0;
                const isRatingEqualToIndex = Math.ceil(stars) === index + 1;
                const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

                return (
                    <div key={index} className={`${styles.star} ${isInteractive === false && styles.cursorDefault}`}>
                        <div className={styles.filled} style={{ width: showRatingWithPrecision ? `${(stars % 1) * 100}%` : '0%' }}>
                            <MdOutlineStar size={big ? starSize : starSize / 2} color={"#e87400"} />
                        </div>
                        <div /* style={{ color: emptyStar ? 'gray' : 'inherit' }} */>
                            {emptyStar ? <MdOutlineStarBorder size={big ? starSize : starSize / 2} color={"#e87400"} /> : <MdOutlineStar size={big ? starSize : starSize / 2} color={"#e87400"} />}
                        </div>
                    </div>
                );
            })}
        </div>

    );
};