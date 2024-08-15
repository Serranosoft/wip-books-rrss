import Button from "@/components/button";
import styles from "@/styles/layout/home/hero.module.scss";

export default function Hero() {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.info}>¡Más de 10.000 libros disponibles!</span>
                <h1>El brillante destino para los lectores</h1>
                <span className={styles.subheading}>Disfruta del trabajo de millones de autores, escribe y conoce la opinión de otros lectores.</span>
                <Button>Ver más</Button>
            </div>
        </div>
    )
}