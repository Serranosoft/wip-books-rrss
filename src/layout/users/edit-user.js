import styles from "@/styles/pages/users/edit-user.module.scss";
import Modal from "@/components/modal";
import { useState } from "react";
import Button from "@/components/button";
import { editUserInfo_db } from "@/controller/database/user";

export default function EditUser({ info, setInfo, setReload }) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState(info[0].name || "");
    const [title, setTitle] = useState(info[0].title || "");
    const [country, setCountry] = useState(info[0].country || "");
    const [city, setCity] = useState(info[0].city || "");
    const [slug, setSlug] = useState(info[0].slug || "");
    const [about, setAbout] = useState(info[0].about || "");

    async function save() {
        
        const oldSlug = info[0].slug;

        if (name.length > 0) {
            await editUserInfo_db({ userId: info[0].id, name, title, country, city, slug, about });
            
            const copy = [...info];

            copy[0].name = name;
            copy[0].title = title;
            copy[0].country = country;
            copy[0].city = city;
            copy[0].slug = slug;
            copy[0].about = about;

            setInfo(copy);
            setShow(false);
        }

        if (slug !== oldSlug) setReload(true);

    }

    return (
        <div className={styles.container}>
            <div className={styles.edit}>
                <Button onClick={() => setShow(true)}>Editar</Button>
            </div>
            <Modal {... { show, setShow, className: styles.modal }}>
                <p className={styles.heading}>Editar perfil</p>
                <div className="group">
                    <label className="muted">Nombre</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} />
                </div>
                <div className="group">
                    <label className="muted">Título</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60} />
                </div>
                <div className="group">
                    <label className="muted">País</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} maxLength={60} />
                </div>
                <div className="group">
                    <label className="muted">Ciudad</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} />
                </div>
                <div className="group">
                    <label className="muted">URL del perfil <span>(shinyreads.com/usuario/url_del_perfil)</span></label>
                    <div className={styles.inputUser}>
                        <span>@</span>
                        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={60} />
                    </div>
                </div>
                <div className="group">
                    <label className="muted">Sobre mi <strong>(250 carácteres max.)</strong></label>
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} maxLength={250}></textarea>
                </div>
                <Button onClick={save}>Guardar cambios</Button>
            </Modal>
        </div>
    )
}