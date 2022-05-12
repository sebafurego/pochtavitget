import {Alert} from "@vkontakte/vkui";
import React from "react";


const SuccessAddedPopout = ({setPopout}) =>{
    return (
        <Alert
            actions={[
                {
                    title: "Ок",
                    autoclose: true,
                    mode: "commerce",
                },
            ]}
            actionsLayout="horizontal"
            onClose={()=>setPopout(null)}
            header=""
            text="Отлично, теперь можете отредактировать идентификатор для своей карты"
        />
    )
}
export default SuccessAddedPopout