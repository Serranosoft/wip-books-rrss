import styles from "@/styles/components/modal.module.scss";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

export default function Modal({ show = false, setShow, children, important }) {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(show);
    }, [show])
    
    return (
        <div className={`${styles.modal} ${active && styles.show} ${important && styles.important}`}>
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