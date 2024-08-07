import styles from "@/styles/components/button.module.scss";


export default function Button({ children, url }) {

    if (!url) {
        url = "/";
    }

    return (
        <a className={`${styles.button}`} href={url}>{children}</a>
    )
}