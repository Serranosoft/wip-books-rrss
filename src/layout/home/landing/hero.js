import Button from "@/components/button";
import ButtonLink from "@/components/button-link";
import styles from "@/styles/layout/home/landing/hero.module.scss";

export default function Hero() {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.info}>¡Más de 10.000 libros disponibles!</span>
                <h1>El brillante destino para los lectores</h1>
                <span className={styles.subheading}>Disfruta del trabajo de millones de autores, escribe y conoce la opinión de otros lectores.</span>
                <ButtonLink url="/libro/rtyrtyrtyrty">Ver más</ButtonLink>
            </div>
        </div>
    )
}