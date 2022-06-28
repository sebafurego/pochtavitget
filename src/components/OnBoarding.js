import React, {useState} from "react"
import {Button, Panel, PanelHeader, Placeholder} from "@vkontakte/vkui";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import im from "../img/onBoardImg.png"
import im2 from "../img/onBoardImg2.png"
import {
    Icon24Add,
    Icon24ChevronLeft,
    Icon24ChevronRight,
    Icon28MagnifierPlus,
    Icon56AccessibilityOutline
} from '@vkontakte/icons';
import SuccessAddedPopout from "./SuccessAddedPopout";
import {Icon28HelpCircleOutline} from '@vkontakte/icons';
import RpLogo from "../img/RP logo.png"
import RpLogo2 from "../img/RP logo2.png"
import index2 from "../img/Index 2 1.png"
import search from "../img/Search.png"
import frame6 from "../img/Frame 6.png"
import logo from "../img/Vector.svg"

const onBoarding = ({id, endBoarding, bridge, setGroupRole, setGroupId}) => {
    const [activeScreen, setActiveScreen] = useState(0)
    const [direction,setDirection] = useState("item")
    const slides = [
        <div className={"step_board"}>
            <Placeholder icon={<img className={"img_d z"} style={{borderRadius: 20}} width={100} height={100} src={logo}/>}
                         header={"Добро пожаловать!"}>
                <br/>
                <span style={{color:"black"}}>
                     Приложение Почты России поможет:
                </span>
                <ul className={"kk_k_1"}>
                    <li style={{color:"black"}}>
                        найти ближайшее отделение связи или почтомат;
                    </li>
                    <li style={{color:"black"}}>
                        узнать примерные сроки и стоимость доставки;
                    </li>
                    <li style={{color:"black"}}>
                       уточнить время работы отделений.
                    </li>
                </ul>
            </Placeholder>
            {/*<Button onClick={addToGroup}>Добавить в группу</Button>*/}
        </div>,
        <div className={"step_board"}>
            <Placeholder
                icon={ <img src={RpLogo} width={80} />}
                header={"Как найти ближайшее отделение или почтамат"}>

                <ul className={"kk_k_1 notflex"}>
                    <li style={{color:"black"}}>
                        В поиске

                    </li>
                    <img src={search} width={"90%"} style={{marginBottom:15,maxWidth:300}}/>
                    <li style={{color:"black"}} className={"li_with_im"}>
                        На карте
                        <img style={{marginLeft:10}} src={frame6} width={30} />
                    </li>

                </ul>

            </Placeholder>
        </div>,
        <div className={"step_board"}>
            <Placeholder
                icon={ <img src={RpLogo2} width={80} />}
               >
                <div className={"flex_diov"}>
                    <span style={{color:"black",marginBottom:20}}>
                    Сообщите продавцу адрес или индекс отделения (почтомата), когда оформляете заказ.
                </span>

                    <img src={index2} width={"90%"} style={{marginBottom:25,marginTop:20,maxWidth:300}}/>
                    <span>
                    <b style={{color:"#FF8200"}}>
                        Приятных покупок!  А быстрая доставка — на нас.
                    </b>
                </span>
                </div>


            </Placeholder>
        </div>,
        <div className={"step_board"}>
            <Placeholder
                icon={
                    <img className={"img_d"} width={"90%"} style={{maxWidth: 400, borderRadius: 20}} src={im2}/>
                }>
                При оформлении заказа сообщите продавцу индекс отделения или почтомата, в котором вы
                хотели бы получить свою посылку.

            </Placeholder>
        </div>
    ]
    const addToGroup = () => {
        bridge.send("VKWebAppAddToCommunity").then((r) => {
            if (r.hasOwnProperty("group_id")) {
                setGroupRole("admin")
                setGroupId(r.group_id)
            }
        });
    }
    const childFactory = (direction) => (child) =>(
        React.cloneElement(child,{
            classNames:direction
        })
    )
    return (
        <Panel id={id}>
            <div className={"sdfjksdjhkjk"}>
                <div className={"boarding_view"}>
                    <TransitionGroup childFactory={childFactory(direction)}  className="this_is_trans_">
                        <CSSTransition
                            key={activeScreen}
                            timeout={500}
                            classNames={direction}
                            mountOnEnter={false}
                            unmountOnExit={true}
                        >

                            {slides[activeScreen]}
                        </CSSTransition>
                    </TransitionGroup>
                    <div  className={"boarding_buttons"}>
                        {/*<Button before={<Icon24Add/>} onClick={endBoarding} stretched size={"m"} mode={"outline"} className={"boarding_bottom"}>
                        Добавить в группу
                    </Button>*/}
                        <Button onClick={endBoarding} stretched size={"m"} mode={"outline"} className={"boarding_bottom"}>
                            Пропустить
                        </Button>
                        <div className={"boarding_indicators"}>
                            <button onClick={() => {
                                if (activeScreen > 0) {
                                    setActiveScreen(prevState => prevState - 1)
                                    setDirection("item-left")
                                }
                            }}>
                                <Icon24ChevronLeft/>
                            </button>
                            <div className={"indicators_div"}>
                                <div className={`indicator ${activeScreen === 0 ? "on" : ""}`}/>
                                <div className={`indicator ${activeScreen === 1 ? "on" : ""}`}/>
                                <div className={`indicator ${activeScreen === 2 ? "on" : ""}`}/>
                                {/*<div className={`indicator ${activeScreen === 3 ? "on" : ""}`}/>*/}
                            </div>
                            <button onClick={() => {
                                if (activeScreen < 2) {
                                    setActiveScreen(prevState => prevState + 1)
                                    setDirection("item")
                                }
                                else endBoarding();
                            }}>
                                <Icon24ChevronRight/>
                            </button>

                        </div>
                    </div>

                </div>

            </div>


        </Panel>
    )
}
export default onBoarding;