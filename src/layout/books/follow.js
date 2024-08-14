import Button from "@/components/button";
import { follow_db, followingByBookReviews, unfollow_db } from "@/controller/database/followers";
import { useEffect, useState } from "react";

export default function Follow({ reviews, review, userId }) {

    const [following, setFollowing] = useState(null);

    /** Al recibir todas las reviews se comprueba si algun usuario lo estoy siguiendo */
    useEffect(() => {
        usersFollowing();
    }, [reviews])

    /** Encargado de establecer una relación de seguidor con el usuario actual */
    async function follow() {
        await follow_db({ followerId: userId, followedId: review.users.id });
        onFollowAdd();
    }

    /** Encargado de eliminar una relación de seguidor con el usuario actual */
    async function unfollow() {
        await unfollow_db({ followerId: userId, followedId: review.users.id });
        onFollowDelete();
    }

    /** Al añadir un seguidor, se actualiza el state */
    function onFollowAdd() {
        const copy = [...following];
        copy.push({ followed_id: review.users.id });
        setFollowing(copy);
    }

    /** Al eliminar un seguidor, se actualiza el state */
    function onFollowDelete() {
        const copy = [...following];
        const items = copy.filter((item) => item.followed_id !== review.users.id);
        setFollowing(items);
    }

    /** Encargado de obtener un array con los ids de los usuarios que han escrito una review y los tiene como «Seguido»  */
    async function usersFollowing() {
        const result = await followingByBookReviews({ userId, reviews });
        setFollowing(result);
    }

    return (
        <>
            {
                following && following.find((item) => item.followed_id === review.users.id) ?
                    <Button onClick={unfollow}>Dejar de seguir</Button> : <Button onClick={follow}>Seguir</Button>
            }
        </>
    )
}