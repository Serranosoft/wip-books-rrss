import styles from "@/styles/components/modal.module.scss";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

export default function Modal({ show, setShow, children, important, className }) {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(show);
    }, [show])

    return (
        <div className={`${styles.modal} ${className && className} ${active && styles.show} ${important && styles.important}`}>
            <div>
                <div>
                    <div className={styles.header}>
                        <MdClose onClick={() => setShow(false)}/>
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}