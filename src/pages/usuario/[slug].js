import { getUserInfoBySlug, getUserSlugs } from "@/controller/database/user";
import { useEffect } from "react";

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
    const slugs = await getUserSlugs();
    return {
        paths: slugs.map((item) => `/usuario/${item.slug}`),
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const data = await getUserInfoBySlug({ slug: context.params.slug });
    return {
        props: { data }
    };
}