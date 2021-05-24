import React, {} from "react";
import s from './Main.module.sass'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export function Main(){

    const notify = () => {
        toast('copied!')
    }

    return(
        <>
            <div className={s.main}>
                <div className={s.block}>
                    <a  className={s.item} href="https://www.instagram.com/_tvoy_space_/">instagram</a>
                    <a className={s.item} href="https://twitter.com/_whoisdaddy">twitter</a>
                </div>
                <div className={s.block}>
                    <a onClick={notify} className={s.item} href="#">mail</a>
                    <a className={s.item} href="https://vk.com/yourspacework">vk</a>
                </div>
            </div>
        </>
    )
}
