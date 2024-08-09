export function getTotalRating(ratings) {
    if (ratings.length > 1) {
        let sum = 0;
        ratings.forEach((rating) => sum += rating);
        const result = sum / ratings.length;
        return Math.round((result + Number.EPSILON) * 100) / 100;
    }
    return ratings[0];
}