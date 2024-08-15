import styles from "@/styles/pages/users/[slug].module.scss";
import { getUserInfoBySlug_db, getUserSlugs_db } from "@/controller/database/user";
import EditUser from "@/layout/users/edit-user";
import { useEffect, useState } from "react";

export default function User({ data }) {

    const [info, setInfo] = useState(null);

    useEffect(() => {
        if (data) {
            setInfo(data);
        }
    }, [data])

    return (
        <>
            {
                info &&
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.userInfo}>
                            <div className={styles.user}>
                                <img src={info[0].image} />
                                <div className={styles.userProfile}>
                                    <span className={styles.name}>{info[0].name}</span>
                                    <span className="muted">@{info[0].slug}</span>
                                </div>
                                <EditUser {...{ info, setInfo }} />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.title}>{info[0].title || ""}</span>
                                <div className={styles.metadata}>
                                    <span className="muted">23,296 seguidores</span>
                                    <span className="muted">1,098 siguiendo</span>
                                    <span className="muted">34 libros</span>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.group}>
                                        <span>País</span>
                                        <span className="muted">{info[0].country || `${info[0].name} no ha incluido país`}</span>
                                    </div>
                                    <div className={styles.group}>
                                        <span>Ciudad</span>
                                        <span className="muted">{info[0].city || `${info[0].name} no ha incluido ciudad`}</span>
                                    </div>
                                </div>
                                <div className={styles.group}>
                                    <span>Sobre mi</span>
                                    <span className="muted">{info[0].about || `${info[0].name} no ha incluido detalles`}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.tmp}>
                            <div className={styles.group}>
                                <span>{info[0].name} está leyendo</span>
                                <span className="muted">Actualmente no está leyendo ningún libro</span>
                                {/* Imprimir libros que está leyendoi */}
                            </div>
                            <div className={styles.group}>
                                <span>{info[0].name} quiere leer</span>
                                <span className="muted">Actualmente no quiere leer ningún libro</span>
                                {/* Imprimir libros que quiere leer */}
                            </div>
                        </div>
                    </div>
                </div>
            }
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