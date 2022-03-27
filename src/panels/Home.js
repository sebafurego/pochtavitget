import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import $ from "jquery"
import { Icon28TearOffFlyerOutline } from '@vkontakte/icons';
import {
    Panel,
    PanelHeader,
    Header,
    Button,
    Group,
    Cell,
    Tooltip,
    Div,
    SplitLayout,
    SplitCol,
    Avatar,
    Title,
    View,
    Snackbar,
    IconButton, Subhead
} from '@vkontakte/vkui';
import EditPopout from "../components/EditPopout";
import Main from "../rest/Main";
import {Icon16Done, Icon28InfoOutline} from "@vkontakte/icons";
import {Icon28EditOutline} from "@vkontakte/icons";
import InfoPopout from "../components/InfoPopout";
import SuccessAddedPopout from "../components/SuccessAddedPopout";
import AdminTextPopout from "../components/AdminTextPopout";
import AdminModal from "../components/AdminModal";

const Home = ({id, user_id, group_role, bridge, setGroupRole, setGroupId, vk_group_id, setScreenSpinner}) => {
    const [mapId, setMapID] = useState(null);
    const [modal,setModal] = useState(null)
    const [popout, setPopout] = useState(null);
    const [snack, setSnack] = useState(null);
    const [tooltip, setToolTip] = useState(false)
    const initMap = (snapshot) => {
        const data = snapshot.val();

        if (data === null)
            setMapID(25347)
        else setMapID(data)
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
                console.log("error load map#1", e)
                startWidjet()
            }

            setScreenSpinner(null)
        }
    }, [mapId])
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
                console.log("!", r)
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
    const openInfo = () => {
        setPopout(<InfoPopout setPopout={setPopout} addToGroup={addToGroup}/>)
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
        <SplitLayout modal={<AdminModal setModal={modalBack} modal={modal}/>}>
            <SplitCol>
                <View activePanel={id} popout={popout}>
                    <Panel id={id}>
                        <div className='block'>
                            <div className={"header"}>
                                <Subhead weight={"medium"} style={{color:"white"}}>
                                    Выберите на карте удобное вам отделение получения или почтомат и сообщите продавцу индекс выбранной точки
                                </Subhead>
                            </div>
                            <div className='hblock' data-id={mapId} id='ecom-widget'/>
                            <div className="admin_buttons">
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
                                <IconButton style={{marginLeft: 15}} className={"edit_but but_color"} onClick={openInfo}>
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
