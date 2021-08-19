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
                        <Skill skill={"React"}/>
                        <Skill skill={"Redux"}/>
                        <Skill skill={"TypeScript"}/>
                    </div>
                </div>
            </div>
            <div className={s.blockThree}>
                <div className={s.withB3}>
                    <div className={s.titleSkills}>My works</div>
                    <div></div>
                </div>
            </div>
            <div className={s.blockFour}>
                <div className={s.withB4}>Блок 4</div>
            </div>
            <div className={s.blockFive}>
                <div className={s.withB5}>Блок 5</div>
            </div>
        </>
    )
}
