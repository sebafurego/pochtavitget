import React, {useState, useEffect, useRef} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import "./css/style.css"
import Home from './panels/Home';
import OnBoarding from "./components/OnBoarding";
const url = new URL(document.location.href)
let user_id = 0;
let group_idd = null;
let url_search1 = url.search.split("&");



//TEST PULL
const App = ({}) => {

	const [group_id,setGroupId] = useState(null);
	const group_idRef = useRef();
	group_idRef.current = group_id;
	const [group_role,setGroupRole] = useState(null);
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);

/*	useEffect(()=>{
		window.onpopstate = () =>{
			if(popout){
				setPopout(null)
				return false
			}
		}
	},[])*/


	useEffect(() => {
		let url_search = url.search.split("&");
		for(let i=0;i<url_search.length;i++){
			if(url_search[i].indexOf("vk_user_id") !== -1)
				user_id = url_search[i].split("=")[1];
			if(url_search[i].indexOf("vk_group_id") !== -1){
				bridge.send("VKWebAppStorageSet", {"key": "vk_group", "value": url_search[i].split("=")[1]});
				setGroupId(url_search[i].split("=")[1])
			}
			if(url_search[i].indexOf("vk_viewer_group_role") !== -1){
				setGroupRole(url_search[i].split("=")[1])
			}
		}

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			if(!group_idRef.current){
				let grp_stor = await bridge.send("VKWebAppStorageGet", {"keys": ["vk_group"]});
				console.log(grp_stor)
				if(grp_stor.keys[0].value){
					group_idd = grp_stor.keys[0].value
					setGroupId(grp_stor.keys[0].value)
				}
			}
			bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#fff"}).catch(()=>{});
			setUser(user);
			let onboarding = await bridge.send("VKWebAppStorageGet", {"keys": ["onboarding"]});

			if(!onboarding.keys[0].value){
				setActivePanel("onvboa")
			}


			/*let data = {
				...Object.fromEntries(new URLSearchParams(location.search)),
				"group_id":"123456",
				"code":1
			}
			const response = await fetch("https://lila.deacrm.ru/rest/codes", {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			console.log(await response.json());
			console.log(location.search);

			const response2 = await fetch("https://lila.deacrm.ru/rest/codes"+location.search+"&group_id=123456", {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			console.log(await response2.json());*/


		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const endBoarding = () =>{
		bridge.send("VKWebAppStorageSet", {"key": "onboarding", "value": "true"});
		setActivePanel("home")
	}
	useEffect(()=>{
		const script = document.createElement("script");
		script.src = "https://widget.pochta.ru/map/widget/widget.js";
		script.async = true;
		document.body.appendChild(script);
	},[])
	return (
			<AdaptivityProvider >
				<AppRoot >
					<View activePanel={activePanel} popout={popout}>
							<OnBoarding bridge={bridge} setGroupId={setGroupId} setGroupRole={setGroupRole} endBoarding={endBoarding} id={"onvboa"}/>
							<Home setActivePanel={setActivePanel} user_id={user_id}
								  setGroupRole={setGroupRole}
								  bridge={bridge}
								  setScreenSpinner={setPopout}
								  group_role={group_role}
								  setGroupId={setGroupId} vk_group_id={group_idd} id='home' fetchedUser={fetchedUser} go={go} />
					</View>
				</AppRoot>
			</AdaptivityProvider>
	);
}

export default App;
