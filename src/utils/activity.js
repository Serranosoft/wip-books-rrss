/** Formatea una actividad de reseña */
export function formatReview(review) {
    let activity = `<a href="${review.users.slug}"> ${review.users.name}</a> ha escrito una valoración de ${review.rating} estrellas en el <a href="/libro/${review.books.name}">libro ${review.books.name}</a>`;
    activity += getDaysSinceReview(review.published) !== 0 ? ` hace ${getDaysSinceReview(review.published)} día/s` : " recientemente";
    return activity;
}

/** Devuelve la cantidad de días que han ocurrido entre el día de hoy y el día de publicación de una review */
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