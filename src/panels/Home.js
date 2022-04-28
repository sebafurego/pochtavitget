import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Icon24Add, Icon28TearOffFlyerOutline} from '@vkontakte/icons';
import {
    Panel,
    PanelHeader,
    Tooltip,
    SplitLayout,
    SplitCol,
    Avatar,
    View,
    Snackbar,
    IconButton
} from '@vkontakte/vkui';
import EditPopout from "../components/EditPopout";
import Main from "../rest/Main";
import {Icon16Done, Icon28InfoOutline} from "@vkontakte/icons";
import {Icon28EditOutline} from "@vkontakte/icons";
import SuccessAddedPopout from "../components/SuccessAddedPopout";
import AdminModal from "../components/AdminModal";

const Home = ({id,setActivePanel, user_id, group_role, bridge, setGroupRole, setGroupId, vk_group_id, setScreenSpinner}) => {
    const [mapId, setMapID] = useState(null);
    const [modal,setModal] = useState(null)
    const [popout, setPopout] = useState(null);
    const [snack, setSnack] = useState(null);
    const [tooltip, setToolTip] = useState(false)
    const initMap = (data) => {

        //const data = snapshot.val();
        if (data === null)
            setMapID(25347)
        else setMapID(data)
        setScreenSpinner(null)
    }
    const startWidjet = () => {
        try {
            const script = document.createElement("script");
            script.src = "https://widget.pochta.ru/map/widget/widget.js";
            script.async = true;
            document.body.appendChild(script);
            setTimeout(() => {
                ecomStartWidget({
                    id: mapId,
                    callbackFunction: null,
                    containerId: 'ecom-widget'
                });
            }, 1000)

        } catch (e) {
            console.log("error load map#2", e)
        }
    }
    useEffect(() => {
        if (mapId) {
            try {
                ecomStartWidget({
                    id: mapId,
                    callbackFunction: null,
                    containerId: 'ecom-widget'
                });
            } catch (e) {
                startWidjet()
            }


        }
    }, [mapId])
    useEffect(()=>{
       if(vk_group_id){
           Main.get(vk_group_id, initMap);
       } else{
           setMapID(25347)
       }
    },[])
    useEffect(() => {
        if (vk_group_id !== null)
            Main.get(vk_group_id, initMap);
        else
            setMapID(25347)
    }, [vk_group_id])
    const setAlert = (sd) => {
        let s = {
            alert: true,
            tooltip: sd.hasOwnProperty("tooltip") ? sd.tooltip : false
        }
        bridge.send("VKWebAppStorageSet", {"key": `${vk_group_id}_${user_id}`, "value": JSON.stringify(s)});
    }
    const modalBack = () => {
        setModal(null)
        setTimeout(()=>{
            setToolTip(true)

        },200)
    }
    useEffect(() => {
        //bridge.send("VKWebAppStorageSet", {"key": `${vk_group_id}_${user_id}`, "value": ""});
        if (group_role === "admin" && vk_group_id !== null) {
            bridge.send("VKWebAppStorageGet", {"keys": [`${vk_group_id}_${user_id}`]}).then(r => {
                if (r.keys[0].value) {
                    let s = JSON.parse(r.keys[0].value)
                    /*if (!s.hasOwnProperty("tooltip") || !s.tooltip)*/
                    if (!s.hasOwnProperty("alert") || !s.alert) {
                        setModal("info")
                        //Q!!
                        setAlert(s)
                    }
                } else {
                    setModal("info")
                    //Q!!
                }
            });
        }
    }, [group_role, vk_group_id])
    const saveEdit = (id) => {
        Main.save(vk_group_id, id)
        setMapID(id)
        setPopout(null)
        setSnack(
            <Snackbar before={
                <Avatar size={24} style={{background: "var(--accent)"}}>
                    <Icon16Done fill="#fff" width={14} height={14}/>
                </Avatar>
            } onClose={() => setSnack(null)}>Сохранено</Snackbar>
        )
    }
    const openEdit = () => {
        setPopout(<EditPopout id={mapId} setPopout={setPopout} saveEdit={(id) => saveEdit(id)}/>)
    }
    const addToGroup = () => {
        setPopout(null)
        bridge.send("VKWebAppAddToCommunity").then((r) => {
            if (r.hasOwnProperty("group_id")) {
                setGroupRole("admin")
                setGroupId(r.group_id)
                setPopout(<SuccessAddedPopout setPopout={setPopout}/>)
            }
        });
    }
    const closeTooltip = () => {
        setToolTip(false)
        let s = {
            alert: true,
            tooltip: true
        }
        bridge.send("VKWebAppStorageSet", {"key": `${vk_group_id}_${user_id}`, "value": JSON.stringify(s)});
    }
    return (
        <SplitLayout modal={<AdminModal bridge={bridge} setModal={modalBack} modal={modal}/>}>
            <SplitCol>
                <View activePanel={id} popout={popout}>
                    <Panel id={id}>

                        <div className='block'>
                            <PanelHeader>Почта России</PanelHeader>
                            {/*<div className={"header"}>
                                <Subhead weight={"medium"} style={{color:"white"}}>
                                    Выберите на карте удобное вам отделение получения или почтомат и сообщите продавцу индекс выбранной точки
                                </Subhead>
                            </div>*/}
                            <div className='hblock' data-id={mapId} id='ecom-widget'/>
                            <div className="admin_buttons">
                                {(!group_role || group_role !== "admin") &&
                                    <IconButton style={{marginRight: 15}} className={"edit_but but_color"}
                                                onClick={() => addToGroup()}>
                                        <Icon24Add width={28} height={28}/>
                                    </IconButton>
                                }
                                {group_role && group_role === "admin" &&
                                <IconButton style={{marginRight: 15}} className={"edit_but but_color"}
                                            onClick={() => setModal("info")}>
                                    <Icon28TearOffFlyerOutline/>
                                </IconButton>
                                }
                                {group_role && group_role === "admin" &&
                                <Tooltip
                                    mode="accent"
                                    text="Менять индетификатор можно тут"
                                    isShown={tooltip}
                                    onClose={closeTooltip}
                                >
                                    <IconButton className={"edit_but but_color"} onClick={openEdit}>
                                        <Icon28EditOutline />
                                    </IconButton>
                                </Tooltip>
                                }
                                {/*openInfo*/}
                                <IconButton style={{marginLeft: 15}} className={"edit_but but_color"} onClick={()=>setActivePanel("onvboa")}>
                                    <Icon28InfoOutline/>
                                </IconButton>
                            </div>

                        </div>
                        {snack}
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>

    )
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
