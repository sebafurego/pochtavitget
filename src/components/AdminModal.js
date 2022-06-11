import React, {useState} from "react"
import {
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderBack, Title, Group, Subhead, usePlatform, IOS, ANDROID, Button, Link, IconButton
} from "@vkontakte/vkui"

import i1 from "../img/i1.png"
import i2 from "../img/i2.png"
import i3 from "../img/i3.png"
import i4 from "../img/i4.png"
import i5 from "../img/i5.png"
import i6 from "../img/i6.png"
import {
    Icon16ChevronLeft,
    Icon16Pen,
    Icon20Cancel,
    Icon24ChevronLeft,
    Icon24ChevronRight,
    Icon28CancelAltOutline
} from "@vkontakte/icons";
import Pic from "../img/Pict1.png"

const url = new URL(document.location.href)
let url_search1 = url.search.split("&");
let plat;
import cont from "../img/Steps2.png"
import cont2 from "../img/step2.png"
import cont3 from "../img/step3.png"

url_search1.forEach((item) => {
    if (item.indexOf("vk_platform") !== -1) {
        plat = item.split("=")[1];
        return;
    }
})
const AdminModal = ({modal, openPopView, setModal, bridge}) => {
    const platform = usePlatform();
    const [screen, setScreen] = useState(0);
    const openImages = (imgs) => {
        bridge.send("VKWebAppShowImages", {
            images: imgs
        });
    }
    return (
        <ModalRoot
            activeModal={modal}
            onClose={() => {
                setScreen(0)
                setModal()
            }}

        >
            <ModalPage
                id={"info"}
                style={{width: "100%"}}
                settlingHeight={100}
                onClose={() => {
                    setScreen(0)
                    setModal()
                }}
                className={"asdkl"}
                header={
                    <ModalPageHeader
                        multiline

                        right={
                            <IconButton label="Назад" onClick={() => {
                                setScreen(0)
                                setModal()
                            }}>
                                <Icon28CancelAltOutline/>
                            </IconButton>
                        }
                    >
                        Инструкция
                    </ModalPageHeader>
                }
            >
                <Group style={{padding: 20}}>
                    {screen === 0 &&
                        <div className={"zxcd"}
                             style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Title level={"3"} style={{fontWeight: 600}}>
                                Добро пожаловать в приложение Почты России!
                            </Title>
                            <Subhead style={{marginTop: 20}}>
                                Здесь вы можете рассчитать срок и стоимость доставки ваших товаров до покупателя.
                            </Subhead>
                            <ul style={{paddingLeft:15}}>
                                <li>
                                    Получите доступ к специальным тарифам, подписав договор оферты. Это займёт всего 15
                                    минут.
                                </li>
                                <li>
                                    Переходите к подключению приложения, если у вас уже есть договор или вы не
                                    планируете его заключать.
                                </li>
                            </ul>
                            <div className={"buttons_modal checkiin"}
                                 style={{flexDirection: plat !== "desktop_web" ? "column" : "row"}}>
                                <Button stretched onClick={() => setScreen(1)}
                                        style={{margin: plat === "desktop_web" ? 20 : 0,marginBottom:plat === "desktop_web" ? 0 : 20, backgroundColor: "#1937FF"}} size={"m"} mode={"primary"}>
                                    К спецтарифам
                                </Button>
                                <Button stretched onClick={() => setScreen(2)} style={{margin: plat === "desktop_web" ? 20 : 0,marginBottom:plat === "desktop_web" ? 0 : 20, color: "black"}}
                                        size={"m"} mode={"secondary"}>
                                    Подключить приложение
                                </Button>
                            </div>
                        </div>
                    }
                    {screen === 1 &&
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Link style={{textDecoration: "none", color: "black"}} href={"https://otpravka.pochta.ru/"}
                                  target={"_blank"}>
                                <Title level={"3"} style={{fontWeight: 600}}>
                                    Подключите тарифы в <span style={{color: "#1937FF"}}>личном кабинете для бизнеса «Отправка»!</span>
                                </Title>
                            </Link>

                            <ol>
                                <li>
                                    <Link style={{textDecoration: "none", color: "black"}}
                                          href={"https://passport.pochta.ru/pc/ext/v2.0/form/signIn?flow=OIDC&restart_uri=https%3A%2F%2Fpassport.pochta.ru%2Foauth2%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3DAR_mfCjWzYuiXUhIeEuTAVQKc5Ma%26redirect_uri%3Dhttps%3A%2F%2Fotpravka.pochta.ru%2Fauth%26scope%3Dopenid%2Bemail%2Bphone%2BfirstName%2BlastName%2BmiddleName%26state%3DaHR0cHM6Ly9vdHByYXZrYS5wb2NodGEucnUvZGFzaGJvYXJk&lang=ru_RU"}
                                          target={"_blank"}>
                                        Для этого нажмите <span style={{color: "#1937FF"}}>«Войти»</span> в личном кабинете
                                    </Link>
                                </li>
                                <li style={{marginTop: 10}}>
                                    Заключите договор оферты онлайн и выберите услуги для интернет- торговли:
                                    <ul className={"kk_k"}>
                                        <li>
                                            «Посылка онлайн» — самовывоз из отделений Почты и почтоматов;
                                        </li>
                                        <li>
                                            «Курьер онлайн» — доставка покупателю на дом.
                                        </li>
                                    </ul>

                                </li>
                            </ol>
                            {plat === "desktop_web" &&
                                <img style={{width: "80%", alignSelf: "center"}} src={cont}/>
                            }
                            <div className={"buttons_modal"}
                                 style={{flexDirection: plat !== "desktop_web" ? "column" : "row"}}>
                                {plat !== "desktop_web" &&
                                    <Link onClick={() => openPopView()} style={{marginBottom: 20}}>
                                        Посмотреть на примере
                                    </Link>
                                }

                                <Button stretched style={{margin: plat === "desktop_web" ? 20 : 0,marginBottom:plat === "desktop_web" ? 0 : 20, color: "black"}} onClick={() => setScreen(0)}
                                        size={"m"} mode={"secondary"}>
                                    В начало
                                </Button>
                                <Button stretched onClick={() => setScreen(2)} size={"m"}
                                        style={{margin: plat === "desktop_web" ? 20 : 0,marginBottom:plat === "desktop_web" ? 0 : 20, backgroundColor: "#1937FF"}}>
                                    Подключить приложение
                                </Button>
                            </div>
                        </div>
                    }
                    {screen === 2 &&
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Title level={"3"} style={{fontWeight: 600}}>
                                Как подключить приложение?
                            </Title>
                            <ol style={{paddingLeft:15}}>
                                <Link style={{textDecoration: "none", color: "black"}}
                                      href={"https://widget.pochta.ru/"}
                                      target={"_blank"}>
                                <li>
                                    Перейдите по ссылке и создайте свой виджет Почты <span style={{color: "#1937FF"}}>в конструкторе.</span>
                                </li>
                                </Link>
                                <li>
                                    Зарегистрируйтесь/авторизуйтесь, нажмите «Добавить» и в появившемся окне впишите
                                    адрес
                                    <Link href={"https://cms.pochta.ru/vk"}>https://cms.pochta.ru/vk</Link>.
                                </li>
                            </ol>
                            <Subhead style={{fontWeight: 600}}>
                                Указанный сайт автоматически добавится в список «Мои сайты».
                            </Subhead>

                            {plat === "desktop_web" &&
                                <img src={cont2} style={{width: "80%", marginTop: 20, alignSelf: "center"}}/>
                            }
                            <div className={"buttons_modal"}
                                 style={{marginTop: 50, flexDirection: plat !== "desktop_web" ? "column" : "row"}}>
                                {plat !== "desktop_web" &&
                                    <Link onClick={() => openPopView()} style={{marginBottom: 20}}>
                                        Посмотреть на примере
                                    </Link>
                                }

                                <Button stretched
                                        style={{margin: plat === "desktop_web" ? 20 : 0,marginBottom:plat === "desktop_web" ? 0 : 20, flex: plat !== "desktop_web" ? "" : 1, color: "black"}}
                                        onClick={() => setScreen(0)} size={"m"} mode={"secondary"}>
                                    В начало
                                </Button>
                                <div className={"left_right"} style={{
                                    flex: plat !== "desktop_web" ? "" : .5,
                                    justifyContent: plat !== "desktop_web" ? "space-around" : "center"
                                }}>
                                    <Button

                                        disabled={screen <= 2}
                                        onClick={() => setScreen(prevState => prevState - 1)} size={"m"}
                                        style={{margin: plat === "desktop_web" ? 20 : 0,marginBottom:plat === "desktop_web" ? 0 : 20, backgroundColor: screen <= 2 ? "grey" : "#1937FF"}}>
                                        <Icon24ChevronLeft/>
                                    </Button>
                                    <Button disabled={screen >= 4}
                                            onClick={() => setScreen(prevState => prevState + 1)} size={"m"}
                                            style={{margin: plat === "desktop_web" ? 20 : 0,marginBottom:plat === "desktop_web" ? 0 : 20, backgroundColor: screen >= 4 ? "grey" : "#1937FF"}}>
                                        <Icon24ChevronRight/>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    }
                    {screen === 3 &&
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Title level={"3"} style={{fontWeight: 600}}>
                                Как настроить расчёт сроков и стоимости?
                            </Title>
                            <ol style={{paddingLeft:15}}>
                                <li>
                                    Кликните на ваш созданный виджет и перейдите к настройкам.
                                </li>
                                <li>
                                    Заполните все пустые поля и сохраните настройки.
                                </li>
                                <li>
                                    Перейдите в раздел «Код виджета» и скопируйте уникальный id виджета.
                                </li>
                            </ol>
                            <Subhead style={{fontWeight: 600}}>
                                Виджет настроен и готов к работе!
                            </Subhead>
                            {plat === "desktop_web" &&
                                <img src={cont3} style={{width: "80%", marginTop: 20, alignSelf: "center"}}/>
                            }
                            <div className={"buttons_modal"}
                                 style={{marginTop: 50, flexDirection: plat !== "desktop_web" ? "column" : "row"}}>
                                {plat !== "desktop_web" &&
                                    <Link onClick={() => openPopView()} style={{marginBottom: 20}}>
                                        Посмотреть на примере
                                    </Link>
                                }
                                <Button style={{color: "black"}} onClick={() => setScreen(0)} size={"m"}
                                        mode={"secondary"}>
                                    В начало
                                </Button>
                                <div className={"left_right"}>
                                    <Button
                                        disabled={screen <= 2}
                                        onClick={() => setScreen(prevState => prevState - 1)} size={"m"}
                                        style={{marginTop: 20, backgroundColor: screen <= 2 ? "grey" : "#1937FF"}}>
                                        <Icon24ChevronLeft/>
                                    </Button>
                                    <Button disabled={screen >= 4}
                                            onClick={() => setScreen(prevState => prevState + 1)} size={"m"}
                                            style={{marginTop: 20, backgroundColor: screen >= 4 ? "grey" : "#1937FF"}}>
                                        <Icon24ChevronRight/>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    }
                    {screen === 4 &&
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Title level={"3"} style={{fontWeight: 600}}>
                                Как запустить приложение в сети «ВКонтакте»?
                            </Title>
                            <ol style={{paddingLeft:15}} className={"mnmn"}>
                                <li>
                                    Вернитесь в приложение Почты России в сети «ВКонтакте».
                                </li>
                                <li>
                                    Кликните на<img width={18} height={18} src={Pic}/>
                                    и в появившееся окно
                                    вставьте скопированный id виджета
                                    и сохраните.
                                </li>
                            </ol>
                            <Subhead style={{fontWeight: 600}}>
                                Обратите внимание, что для редактирования приложения необходимо иметь права
                                администратора сообщества.
                            </Subhead>
                            <Subhead style={{fontWeight: 600, marginTop: 20}}>
                                Приложение готово к работе!
                                <br/><span
                                style={{color: "orange"}}>Отличных продаж! А быстрая доставка — на нас.</span>
                            </Subhead>


                            <div className={"buttons_modal"}
                                 style={{marginTop: 50, flexDirection: plat !== "desktop_web" ? "column" : "row"}}>
                                {plat !== "desktop_web" &&
                                    <Link onClick={() => openPopView()} style={{marginBottom: 20}}>
                                        Посмотреть на примере
                                    </Link>
                                }
                                <Button style={{color: "black"}} onClick={() => setScreen(0)} size={"m"}
                                        mode={"secondary"}>
                                    В начало
                                </Button>
                                <div className={"left_right"}>
                                    <Button
                                        disabled={screen <= 2}
                                        onClick={() => setScreen(prevState => prevState - 1)} size={"m"}
                                        style={{marginTop: 20, backgroundColor: screen <= 2 ? "grey" : "#1937FF"}}>
                                        <Icon24ChevronLeft/>
                                    </Button>
                                    <Button disabled={screen >= 4}
                                            onClick={() => setScreen(prevState => prevState + 1)} size={"m"}
                                            style={{marginTop: 20, backgroundColor: screen >= 4 ? "grey" : "#1937FF"}}>
                                        <Icon24ChevronRight/>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    }

                </Group>
                {/* <Group style={{padding:20}}>

                    <Subhead weight={"2"} >
                        Приветствуем вас в приложении Почты России!
                        <br/><br/>
                        Для работы с приложением вам необходимо заключить договор с Почтой России, это быстро и бесплатно
                        <br/><a href={"https://otpravka.pochta.ru/"} target={"_blank"}>https://otpravka.pochta.ru/</a>
                    </Subhead>
                    <img alt={""} onClick={()=>openImages([i1])} style={{width:"100%"}} src={i1}/>
                    <Subhead style={{marginTop:20}} weight={"2"} >
                        Если у вас уже есть договор и Личный Кабинет юридического лица, вам необходимо авторизоваться с логином и паролем от Личного Кабинета на странице
                        <br/>
                        <a href={"https://widget.pochta.ru/"} target={"_blank"}> https://widget.pochta.ru/</a>
                        <br/>
                        С правой стороны нажать на кнопку Добавить, и в появившемся окне вписать адрес
                        <br/><a href={"https://cms.pochta.ru/vk"} target={"_blank"}>  https://cms.pochta.ru/vk</a>

                    </Subhead>
                    <img alt={""} onClick={()=>openImages([i2])} style={{width:"100%"}} src={i2}/>

                    <Subhead style={{marginTop:20}} weight={"2"} >
                        Указанный сайт автоматически добавится в список «Мои сайты».
                        Далее необходимо нажать на название сайта в разделе «Мои сайты» и выполнить ряд настроек.
                    </Subhead>
                    <img alt={""} onClick={()=>openImages([i3])} style={{width:"100%"}} src={i3}/>
                    document.location.href.split("?")[0]
                    <ul style={{paddingLeft:20}}>
                        <li>
                          В поле “Индекс отправителя” введите точку сдачи (индекс), который указан в вашем Личном Кабинете Почты России. Это точка,откуда вы будете осуществлять отправления. С неё же будут осуществляться все расчеты стоимости и сроков доставки.
                        </li>
                        <li>
                           В поле “средняя стоимость вложений” укажите среднюю стоимость товаров в вашем обычном отправлении. Обратите внимание,что этот параметр будет объявлять объявленную ценность вложений и влиять на стоимость отправки. Если вы хотите создавать отправления без объявленной ценности,укажите в этом параметре 0.
                        </li>
                        <li>
                            В поле “Вес по умолчанию” укажите средний вес вашего обычного отправления. Это число будет использоваться в приблизительных расчетах доставки на карте.
                        </li>
                        <li>
                            В поле “Добавочный вес” укажите вес упаковки или оставьте это поле пустым.
                        </li>
                        <li>
                           В разделе “Тип и приоритет доставки” выберите желаемые тарифы и поставьте галочку в чек-бокс “Использовать наиболее выгодный тариф”.
                        </li>
                        <li>
                            В разделе “Отделения на карте” выберите отделения и/или почтоматы для отображения на карте. Обратите внимание,что при выборе пункта “почтоматы” вам необходимо указать типоразмер отправлений.
                        </li>
                        <li>
                            В разделе “Сроки и стоимость доставки” выберите необходимую наценку или скидку, настройте отображение сроков доставки и укажите дополнительное время обработки заказа.
                        </li>
                        <li>
                            При необходимости выберите дополнительные платные опции.
                        </li>
                        <li>
                            Нажмите кнопку “сохранить”.
                        </li>
                        <li>
                            Перейдите в раздел  “Код виджета” и скопируйте уникальный id настроенного виджета.
                        </li>
                        <img alt={""} onClick={()=>openImages([i4])} style={{width:"100%"}} src={i4}/>
                        <li>
                            Перейдите в приложение ВКонтакте<br/>
                            Почта России
                        </li>
                        <li>
                            Далее нажмите на кнопку информации: синяя кнопка с значком “i”
                        </li>
                        <img alt={""} onClick={()=>openImages([i5])} style={{width:"100%"}} src={i5}/>
                        <li>
                            После чего появится сообщение что вы можете добавить себе приложение в сообщество
                        </li>
                        <img alt={""} onClick={()=>openImages([i6])} style={{width:"100%"}} src={i6}/>
                        <li>
                            После того как приложение добавлено в сообщество и при условии что вы являетесь администратором у вас появится возможность добавить идентификатор карты: синяя кнопка с карандашиком. В появившемся окне вставьте идентификатор и сохраните.
                        </li>
                        <li>
                            Настройки завершены, приложение готово к работе.
                        </li>
                    </ul>
                    <Subhead style={{marginTop:20}} weight={"2"} >
                        Вы можете отправить покупателям ссылку на приложение, чтобы они передали вам индекс, по которому им удобно получить отправление.
                    </Subhead>
                </Group>*/}

            </ModalPage>

        </ModalRoot>
    )
}
export default AdminModal