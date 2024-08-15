import styles from "@/styles/pages/users/[slug].module.scss";
import { getUserInfoBySlug_db, getUserSlugs_db } from "@/controller/database/user";
import Button from "@/components/button";

export default function User({ data }) {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.userInfo}>
                    <div className={styles.user}>
                        <img src={data[0].image} />
                        <div className={styles.userProfile}>
                            <span className={styles.name}>{data[0].name}</span>
                            <span className="muted">@{data[0].slug}</span>
                        </div>
                        <div className={styles.edit}>
                            <Button>Editar perfil</Button>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.title}>{data[0].title || "Branding Designer, Illustrator, & Content Creator"}</span>
                        <div className={styles.metadata}>
                            <span className="muted">23,296 seguidores</span>
                            <span className="muted">1,098 siguiendo</span>
                            <span className="muted">34 libros</span>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <span>País</span>
                                <span className="muted">{data[0].country || "España"}</span>
                            </div>
                            <div className={styles.group}>
                                <span>Ciudad</span>
                                <span className="muted">{data[0].city || "Granada"}</span>
                            </div>
                        </div>
                        <div className={styles.group}>
                            <span>Sobre mi</span>
                            <span className="muted">Leo libros y a veces los disfruto</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tmp}>
                    <div className={styles.group}>
                        <span>{data[0].name} está leyendo</span>
                        <span className="muted">Actualmente no está leyendo ningún libro</span>
                        {/* Imprimir libros que está leyendoi */}
                    </div>
                    <div className={styles.group}>
                        <span>{data[0].name} quiere leer</span>
                        <span className="muted">Actualmente no quiere leer ningún libro</span>
                        {/* Imprimir libros que quiere leer */}
                    </div>
                </div>
            </div>
        </div>
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