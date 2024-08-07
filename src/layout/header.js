
import styles from "@/styles/layout/header.module.scss";
import Button from "@/components/button";

export default function Header() {

    return (

        <header className={`${styles.header}`}>
            <img src="/img/yummy-reads.png"></img>
            <p>Buscador</p>
            <Button>Log In</Button>
        </header>
    )

}