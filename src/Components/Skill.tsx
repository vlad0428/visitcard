import React, {} from "react";
import s from '../Styles/Skill.module.sass'

type SkillType = {
    skill: string
}

export function Skill(props: SkillType) {

    return (
        <div className={s.skill}>
            <div><img src="" alt=""/></div>
            <div className={s.titleSkill}>{props.skill}</div>
            <div className={s.descriptionSkill}>More description about this</div>
            <div className={s.image}></div>
        </div>
    )
}
