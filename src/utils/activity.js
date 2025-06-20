/** Formatea una actividad de reseña */
export function formatReview(review) {
    console.log(review);
    let result = {
        user: review.users.name,
        userSlug: review.users.slug,
        avatar: review.users.image,
        userTitle: review.users.title,
        book: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1705592447l/199440249._SY475_.jpg",
        bookUrl: `${review.books.slug}`
    }
    let activity = `Ha escrito una valoración de ${review.rating} estrellas en el ${review.books.name} libro ${review.books.name}`;
    activity += getDaysSinceReview(review.published) > 1 ? ` hace ${getDaysSinceReview(review.published)} días` : " recientemente";
    result.activity = activity;
    return result;
}

/** Formatea una actividad de follow */
export function formatFollow(follow) {
    let result = {
        user: `/usuario/${follow.followed.slug}`
    }
    let activity = `<a href="/usuario/${follow.follower.name}">${follow.follower.name}</a> ha comenzado a seguir a <a href="/usuario/${follow.followed.slug}">${follow.followed.name}</a>`;
    activity += getDaysSinceReview(follow.timestamp) > 1 ? ` hace ${getDaysSinceReview(follow.timestamp)} días` : " recientemente";
    result.activity = activity;
    return result;
}

/** Devuelve la cantidad de días que han ocurrido entre el día de hoy y el día de publicación de una review */
/** Revisar -> https://github.com/github/relative-time-element (5kb) */
export function getDaysSinceReview(published) {
    const date = new Date(published);
    const now = new Date();

    const differenceInMilliseconds = now - date;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor(differenceInMilliseconds / millisecondsPerDay);

    return daysPassed;
}

/** Devuelve un rango de tiempo de una semana en formato ISO */
export function getWeekRange() {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const timestamp = oneWeekAgo.toISOString(); 
    return timestamp;
}