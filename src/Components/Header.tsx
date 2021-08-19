import React, {} from "react";
import s from '../Styles/Header.module.sass'

export function Header() {

    return (
        <header className={s.header}>
            <div className={s.with}>
                <nav className={s.navBar}>
                    <ul className={s.ul}>
                        <a href="#" className={s.link}>
                            <li className={s.li}>Главная</li>
                        </a>
                        <a href="#" className={s.link}>
                            <li className={s.li}>Скиллы</li>
                        </a>
                        <a href="#" className={s.link}>
                            <li className={s.li}>Работы</li>
                        </a>
                        <a href="#" className={s.link}>
                            <li className={s.li}>Контакты</li>
                        </a>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
