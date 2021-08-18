import React, {} from "react";
import s from '../Styles/MainPage.module.sass'
import {Skill} from "./Skill";

export function MainPage() {

    return (
        <>
            <div className={s.blockOne}>
                <div className={s.with}>
                    <div className={s.description}>
                        <p>Hey:)</p>
                        <p>I'm Vladislav Voloshenko</p>
                        <p>I'm front-end developer</p>
                    </div>
                    <div className={s.image}>image</div>
                </div>
            </div>
            <div className={s.blockTwo}>
                <div className={s.withB2}>
                    <div className={s.titleSkills}>My skills</div>
                    <div className={s.skills}>
                        <Skill/>
                        <Skill/>
                        <Skill/>
                    </div>
                </div>
            </div>
            <div className={s.blockThree}>
                <div className={s.with}>Блок 3</div>
            </div>
            <div className={s.blockFour}>
                <div className={s.with}>Блок 4</div>
            </div>
            <div className={s.blockFive}>
                <div className={s.with}>Блок 5</div>
            </div>
        </>
    )
}
