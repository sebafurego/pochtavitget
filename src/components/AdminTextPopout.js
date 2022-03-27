import React, {useState} from "react"
import {Alert, FormItem, Input} from "@vkontakte/vkui";
import $ from "jquery"

const AdminTextPopout = ({setPopout,addToGroup}) =>{

    return (
        <Alert
            actions={[
                {
                    title: "Ок",
                    autoclose: true,
                    mode: "destructive",
                },
            ]}
            actionsLayout="horizontal"
            onClose={()=>setPopout(null)}
            header="Информация для админов"
            text="Это официальный модуль Почты России для ВКонтакте. Вы можете настроить индетификатор карт для себя, внизу"
        />
    )
}
export default AdminTextPopout