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
    IconButton, Spinner
} from '@vkontakte/vkui';
import EditPopout from "../components/EditPopout";
import Main from "../rest/Main";
import {Icon16Done, Icon28InfoOutline} from "@vkontakte/icons";
import {Icon28EditOutline} from "@vkontakte/icons";
import SuccessAddedPopout from "../components/SuccessAddedPopout";
import AdminModal from "../components/AdminModal";
import bridge from "@vkontakte/vk-bridge";

const Home = ({
                  id,
                  setActivePanel,
                  user_id,
                  group_role,
                  bridge,
                  setGroupRole,
                  setGroupId,
                  vk_group_id,
                  setScreenSpinner
              }) => {
    const [mapId, setMapID] = useState(null);
    const [modal, setModal] = useState(null)
    const [popout, setPopout] = useState(null);
    const [snack, setSnack] = useState(null);
    const [errorMap, setErrorMap] = useState("")
    const [tooltip, setToolTip] = useState(false)
    const [loadingMap,setLoadingMap] = useState(<Spinner size={"large"} className={"map_load_spinner"}/>)
    const initMap = (data) => {

        //const data = snapshot.val();
        if (data === null)
            setMapID(25347)
        else setMapID(data)
        setLoadingMap(null)
        //setScreenSpinner(null)
    }
    const startWidjet = () => {
        try {
            const script = document.createElement("script");
            script.src = "https://widget.pochta.ru/map/widget/widget.js";
            script.async = true;
            document.body.appendChild(script);
            setTimeout(() => {
                try {

                    ecomStartWidget({
                        id: mapId,
                        callbackFunction: callBack,
                        containerId: 'ecom-widget'
                    })
                    setLoadingMap(null)
                    setErrorMap(null)

                } catch (e) {

                }

            }, 1000)

        } catch (e) {
            console.log("error load map#2", e)
        }
    }

    const callBack = (e) =>{

        /*const paramsContainer = document.querySelector('.map__params');

        paramsContainer.innerHTML = '';

        for (const key in data) {
            const param = document.createElement('div');
            const paramValue = document.createElement('span');

            param.className = 'map__params-item';
            param.textContent = `${key}: `;

            paramValue.textContent = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];

            param.appendChild(paramValue);
            paramsContainer.appendChild(param);
        }*/
    }
    useEffect(() => {
        if (mapId) {

            try {
                ecomStartWidget({
                    id: mapId,
                    callbackFunction: callBack,
                    containerId: 'ecom-widget',
                })
                setErrorMap(null)
            } catch (e) {
                startWidjet()

            }
        }
    }, [mapId])
    useEffect(() => {
        if (vk_group_id) {
            Main.get(vk_group_id, initMap);
        } else {
            setMapID(25347)
        }
    }, [])
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
        setTimeout(() => {
            setToolTip(true)

        }, 200)
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
              /*  setGroupRole("admin")
                setGroupId(r.group_id)*/
                setPopout(<SuccessAddedPopout setPopout={setPopout}/>)
            }
        }).then(()=>{
            bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#fff"});
        }).catch(()=>{
            bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#fff"});
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
    useEffect(()=>{
        window.onpopstate = () =>{
            if(modal){
                setModal(null)
                return false
            }
        }
    },[])
    return (
        <SplitLayout style={{overflowY:"hidden"}} modal={<AdminModal bridge={bridge} setModal={modalBack} modal={modal}/>}>
            <SplitCol style={{overflowY:"hidden"}}>
                <View activePanel={id} popout={popout} style={{overflowY:"hidden"}}>
                    <Panel id={id} style={{overflowY:"hidden"}}>

                        <div className='block' >
                            <PanelHeader>Почта России</PanelHeader>
                            {/*<div className={"header"}>
                                <Subhead weight={"medium"} style={{color:"white"}}>
                                    Выберите на карте удобное вам отделение получения или почтомат и сообщите продавцу индекс выбранной точки
                                </Subhead>
                            </div>*/}
                            {loadingMap}
                            {errorMap &&
                                <div  className={"error_map"}>
                                    {errorMap}
                                </div>
                            }
                            <div className={"map__"}>
                                <div  style={{position:"absolute",height:"100%"}} className='hblock' data-id={mapId} id='ecom-widget'/>
                            </div>
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
                                        text="Менять идентификатор можно тут"
                                        isShown={tooltip}
                                        onClose={closeTooltip}
                                    >
                                        <IconButton className={"edit_but but_color"} onClick={openEdit}>
                                            <Icon28EditOutline/>
                                        </IconButton>
                                    </Tooltip>
                                }
                                {/*openInfo*/}
                                <IconButton style={{marginLeft: 15}} className={"edit_but but_color"}
                                            onClick={() => setActivePanel("onvboa")}>
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
