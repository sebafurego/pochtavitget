import React,{useState} from "react"
import {
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderBack, Title, Group, Subhead
} from "@vkontakte/vkui"
const AdminModal = ({modal,setModal}) =>{
    return (
        <ModalRoot
            activeModal={modal}
            onClose={()=>setModal()}
        >
            <ModalPage
                id={"info"}
                settlingHeight={100}
                onClose={()=>setModal()}
                header={
                    <ModalPageHeader
                        left={
                            <PanelHeaderBack label="Назад" onClick={()=>setModal()} />
                        }
                    >
                        Инструкция виджет ВК
                    </ModalPageHeader>
                }
            >
                <Group style={{padding:20}}>
                    <Subhead weight={"2"} >Заходим на сайт виджета почты и добавляем виджет</Subhead>
                    <img style={{width:"100%"}} src={"https://sebafurego.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2e712720-adf1-497e-ae94-a4df48e8dfa2%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2022-03-22_%D0%B2_09.26.12.png?table=block&id=8cd92280-b492-40cd-9f24-a12a7120f45d&spaceId=d76aa032-4d2c-4c22-9021-79ed69e552a8&width=2000&userId=&cache=v2"}/>
                    <Subhead weight={"2"} >
                        В окне вводим url адрес сайта. На данный момент это адрес расположения приложения.
                    </Subhead>
                    <div style={{userSelect:"text",marginTop:10,marginBottom:15}}>
                        <code >
                            {document.location.href.split("?")[0]}
                        </code>
                    </div>

                    <img style={{width:"100%"}} src={"https://sebafurego.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F75f428e2-dce6-4ba9-b37a-a0ddbf96c2ff%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2022-03-22_%D0%B2_09.27.22.png?table=block&id=0b1eb875-c773-4782-90a8-a8e488e18452&spaceId=d76aa032-4d2c-4c22-9021-79ed69e552a8&width=2000&userId=&cache=v2"}/>
                    <Subhead weight={"2"} >
                        В настройка виджета выбираем параметры необходимые для настройки виджета.
                    </Subhead>
                    <img style={{width:"100%"}} src={"https://sebafurego.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd4a7693b-67c6-487b-953a-a6fb8c12cafb%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2022-03-22_%D0%B2_09.28.04.png?table=block&id=1e1b393a-58a0-4332-b019-1d047907dede&spaceId=d76aa032-4d2c-4c22-9021-79ed69e552a8&width=2000&userId=&cache=v2"}/>
                    <Subhead weight={"2"} >
                        После чего в разделе код виджета копируем идентификатор виджета
                    </Subhead>
                    <img style={{width:"100%"}} src={"https://sebafurego.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff2d95e61-5c5b-43d0-9c87-bf3462f95973%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2022-03-22_%D0%B2_09.28.52.png?table=block&id=e5cf3772-52a7-4eb1-b8d6-1fc1ed56372d&spaceId=d76aa032-4d2c-4c22-9021-79ed69e552a8&width=2000&userId=&cache=v2"}/>

                    <Subhead weight={"2"} >
                        Далее в приложении вы найдете кнопку с карандшиком, нажав на неё у вас появится окно, куда и требуется добавить скопированный индетификатор.
                    </Subhead>
                </Group>

            </ModalPage>

        </ModalRoot>
    )
}
export default AdminModal