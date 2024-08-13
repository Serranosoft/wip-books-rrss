import { login_auth } from "@/controller/database/user";
import styles from "@/styles/components/google-button.module.scss";

export default function GoogleButton() {

    return (
        <button type="button" className={styles.button} onClick={login_auth}>Iniciar sesión con Google</button>
    )
}