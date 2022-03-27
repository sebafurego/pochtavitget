import React, {useState} from "react"
import {Alert, FormItem, Input} from "@vkontakte/vkui";
import $ from "jquery"

const InfoPopout = ({setPopout,addToGroup}) =>{

    return (
        <Alert
            actions={[
                {
                    title: "Добавить в свою группу",
                    mode: "commerce",
                    action: () => addToGroup()
                },
                {
                    title: "Отмена",
                    autoclose: true,
                    mode: "destructive",
                },
            ]}
            actionsLayout="horizontal"
            onClose={()=>setPopout(null)}
            header="О приложении"
            text="Официальный модуль Почты России для ВКонтакте. Вы можете просматривать отделения на карте, стоимость доставки и пункты выдачи."
        />
    )
}
export default InfoPopout