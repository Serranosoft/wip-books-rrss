export function getTotalRating(ratings) {
    if (ratings.length > 1) {
        let sum = 0;
        ratings.forEach((rating) => sum += rating);
        const result = sum / ratings.length;
        return Math.round(result * 2) / 2;
    }
    return ratings[0];
}