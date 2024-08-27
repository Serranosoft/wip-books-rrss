import styles from "@/styles/layout/home/landing/index.module.scss";
import Hero from "./hero";
import Gallery from "./gallery";
import Banner from "./banner";

export default function Landing() {

    return (
        <main className={styles.main}>
            <Hero />
            <Gallery />
            <Banner />
        </main>
    )
}