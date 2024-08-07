export function getTotalRating(ratings) {
    if (ratings.length > 1) {
        const sum = ratings.map((rating) => rating += rating);
        const result = sum / ratings.length;
        return result;
    }
    return ratings[0];
}