import styles from "@/styles/components/button.module.scss";


export default function Button({ children, onClick: event }) {
    return (
        <a className={`${styles.button}`} onClick={event}>{children}</a>
    )
}