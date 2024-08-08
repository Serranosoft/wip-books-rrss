
import styles from "@/styles/layout/header.module.scss";
import Button from "@/components/button";
import Search from "@/components/search";

export default function Header() {

    return (

        <header className={`${styles.header}`}>
            <img src="/img/yummy-reads.png"></img>
            <Search />
            <Button>Log In</Button>
        </header>
    )

}