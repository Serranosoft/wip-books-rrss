import Button from "@/components/button";
import GoogleButton from "@/components/google-button";
import styles from "@/styles/layout/home/banner.module.scss";

export default function Banner() {

    return (
        <div className={styles.container}>
            <div>
                <h2>Encuentra tu próximo libro favorito</h2>
                <span className={styles.subheading}>En Shiny Reads tendrás la oportunidad de conocer la opinión de otros lectores y lectoras para descubrir tu próxima apasionante lectura.</span>
                <div className={styles.actions}>
                    <GoogleButton />
                    <Button>Descubrir más</Button>
                </div>
            </div>
        </div>
    )
}