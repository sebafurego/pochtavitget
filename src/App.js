import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, SplitLayout, SplitCol, ConfigProvider} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import "./css/style.css"
import Home from './panels/Home';
const url = new URL(document.location.href)
let user_id = 0;


//TEST PULL
const App = ({}) => {
	const [group_id,setGroupId] = useState(null);
	const [group_role,setGroupRole] = useState(null);
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		let url_search = url.search.split("&");
		for(let i=0;i<url_search.length;i++){
			if(url_search[i].indexOf("vk_user_id") !== -1)
				user_id = url_search[i].split("=")[1];
			if(url_search[i].indexOf("vk_group_id") !== -1){
				setGroupId(url_search[i].split("=")[1])
			}
			if(url_search[i].indexOf("vk_viewer_group_role") !== -1){
				setGroupRole(url_search[i].split("=")[1])
			}
		}
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				/*const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);*/
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
			<AdaptivityProvider >
				<AppRoot >
					<SplitLayout activePanel={activePanel} popout={popout}>
						<SplitCol>
							<Home user_id={user_id} setGroupRole={setGroupRole} bridge={bridge} setScreenSpinner={setPopout} group_role={group_role} setGroupId={setGroupId} vk_group_id={group_id} id='home' fetchedUser={fetchedUser} go={go} />

						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
	);
}

export default App;
