import React, {useState} from "react"
import {Alert, FormItem, Input} from "@vkontakte/vkui";
import $ from "jquery"

const EditPopout = ({setPopout,id,saveEdit}) =>{
    const [error,setError] = useState(false)
    const sendResult = () =>{
        let input_id = $("#map_id").val()
        if(!input_id)
            setError(true)
        else{
            saveEdit(input_id);
        }
    }
    return (
        <Alert
            actions={[
                {
                    title: "Отмена",
                    autoclose: true,
                    mode: "cancel",
                },
                {
                    title: "Сохранить",
                    mode: "default",
                    action: () => sendResult()
                },

            ]}
            actionsLayout="horizontal"
            onClose={()=>setPopout(null)}
            header="Редактирование"
            text="Измените идентификатор отображаемой карты"
        >
            <FormItem
                style={{paddingRight:0,paddingLeft:0,marginTop:20}}
                status={error ? "error" : ""}
                bottom={
                    error
                        ? "Введите идентификатор"
                        : ""
                }
            >
                <Input type={"number"} maxLength={10} max={10} onChange={()=>setError(false)} id={"map_id"} defaultValue={id}/>
            </FormItem>
        </Alert>
    )
}
export default EditPopout