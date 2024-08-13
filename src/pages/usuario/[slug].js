import { getUserInfoBySlug_db, getUserSlugs_db } from "@/controller/database/user";

export default function User({ data }) {
    console.log(data);

    return (
        <>
            <span>{data[0].name}</span>
            <img src={data[0].image} />
        </>
    )
}


export const getStaticPaths = async () => {
    const slugs = await getUserSlugs_db();
    return {
        paths: slugs.map((item) => `/usuario/${item.slug}`),
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const data = await getUserInfoBySlug_db({ slug: context.params.slug });
    return {
        props: { data }
    };
}