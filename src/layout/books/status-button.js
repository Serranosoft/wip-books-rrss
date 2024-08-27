import styles from "@/styles/components/status-button.module.scss";
import { MdArrowDropDown } from "react-icons/md";
import Button from "@/components/button";
import { getBookStatus_db, setBookAsWantToRead_db, setBookFinishedReading_db, setBookReading_db } from "@/controller/database/user-books";
import { Context } from "@/utils/context";
import { useContext, useEffect, useRef, useState } from "react";
import { ControlledMenu, Menu, MenuItem, MenuRadioGroup, useHover } from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/transitions/zoom.css';

export const Status = {
    WantRead: "WantRead",
    CurrentlyReading: "CurrentlyReading",
    FinishedReading: "FinishedReading"
}

export default function StatusButton({ bookId }) {

    const { userId } = useContext(Context);

    const [wantRead, setWantRead] = useState(false);
    const [currentlyReading, setCurrentyReading] = useState(false);
    const [finishedReading, setFinishedReading] = useState(false);
    const [status, setStatus] = useState("WantRead");

    useEffect(() => {
        switch (status) {
            case Status.WantRead:
                if (wantRead == true) {
                    setWantRead(false);
                } else {
                    setWantRead(true);
                }
                setCurrentyReading(false);
                setFinishedReading(false);
                break;

            case Status.CurrentlyReading:
                setCurrentyReading(true);
                setWantRead(false);
                setFinishedReading(false);
                break;

            case Status.FinishedReading:
                setFinishedReading(true);
                setWantRead(false)
                setCurrentyReading(false);
                break;
        }
    }, [status])

    useEffect(() => {
        if (userId) {
            getBookStatus();
        }
    }, [userId]);

    async function getBookStatus() {
        const result = await getBookStatus_db({ userId, bookId });
        if (result) {
            setWantRead(result.want_to_read);
            setCurrentyReading(result.currently_reading);
            setFinishedReading(result.finished_reading);
        }
    }

    const setBookAsWantToRead = async () => await setBookAsWantToRead_db({ userId, bookId, want_to_read: !wantRead });
    const setBookAsReading = async () => await setBookReading_db({ userId, bookId, currently_reading: !currentlyReading });
    const setBookAsFinished = async () => await setBookFinishedReading_db({ userId, bookId, finished_reading: !finishedReading });

    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

    return (
        <div className={styles.container}>
            <div className={styles.button}>
                <span>{status == "WantRead" ? "Quiero leerlo" : status == "CurrentlyReading" ? "Lo estoy leyendo" : status == "FinishedReading" && "Leído"}</span>
            </div>

            <div className={styles.dropdown} ref={ref} {...anchorProps}>
                <MdArrowDropDown />
            </div>

            <ControlledMenu
                {...hoverProps}
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onClose={() => setOpen(false)}
                align={"center"}
                arrow={true}
                direction={"top"}
                shift={-10}
                transition
            >
                <MenuRadioGroup
                    value={status}
                    onRadioChange={(e) => setStatus(e.value)}
                    className={styles.menuRadio}
                >
                    <MenuItem onClick={setBookAsWantToRead} type="radio" value="WantRead">Quiero leerlo</MenuItem>
                    <MenuItem onClick={setBookAsReading} type="radio" value="CurrentlyReading">Lo estoy leyendo</MenuItem>
                    <MenuItem onClick={setBookAsFinished} type="radio" value="FinishedReading">Lo he leído</MenuItem>
                </MenuRadioGroup>
            </ControlledMenu>

            {/* <Menu menuButton={
                <div className={styles.dropdown}>
                    <MdArrowDropDown />
                </div>
            }
                align={"center"}
                arrow={true}
                direction={"top"}
                shift={-10}
                transition
            >

            </Menu> */}


        </div>
    )
}