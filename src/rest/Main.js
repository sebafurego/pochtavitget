import axios from 'axios';
import http from "./CreateAxios";
import { initializeApp } from "firebase/app";
import { getDatabase,goOffline, ref,onValue,get ,set, child} from "firebase/database";


class Main {
    firebaseConfig = {
        apiKey: "AIzaSyCsY8hvcbL3wYBwfgJRsT6skhGhv5igJs8",
        authDomain: "pochta-410dc.firebaseapp.com",
        databaseURL: "https://pochta-410dc-default-rtdb.firebaseio.com",
        projectId: "pochta-410dc",
        storageBucket: "pochta-410dc.appspot.com",
        messagingSenderId: "94333898437",
        appId: "1:94333898437:web:69c8edf51acadf96826aac",
        measurementId: "G-N9DX5989X0"
    };
    // FIREBASE ПЕРЕМЕННЫЕ
    app = initializeApp(this.firebaseConfig);
    database = getDatabase(this.app);
    dbRef = ref(getDatabase());

    // FIREBASE ПЕРЕМЕННЫЕ
    get(vk_group_id,callback){
        onValue(ref(this.database, `groups/${vk_group_id}`), callback,()=>callback(null));
    }
    save(vk_group_id,map_id){
        const db = getDatabase();
        set(ref(db, 'groups/' + vk_group_id), map_id).then((r)=>{
        });
    }
}
export default new Main();