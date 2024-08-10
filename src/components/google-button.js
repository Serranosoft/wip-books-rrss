import styles from "@/styles/components/google-button.module.scss";

export default function GoogleButton({ onClick: event }) {

    return (
        <button type="button" className={styles.button} onClick={event}>Iniciar sesión con Google</button>
    )
}