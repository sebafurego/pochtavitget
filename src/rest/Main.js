class Main {

    // FIREBASE ПЕРЕМЕННЫЕ
    get(vk_group_id,callback){
        fetch("https://lila.deacrm.ru/rest/codes"+location.search, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(r=>r.json()).then(r=>{
            callback(r.data.length > 0 ? r.data[0].code : null)
        });
        //onValue(ref(this.database, `groups/${vk_group_id}`), callback,()=>callback(null));
    }
    save(vk_group_id,map_id){
       /* const db = getDatabase();
        set(ref(db, 'groups/' + vk_group_id), map_id).then((r)=>{
        });*/
        let data = {
            ...Object.fromEntries(new URLSearchParams(location.search)),
            "code":map_id
        }
        fetch("https://lila.deacrm.ru/rest/codes", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}
export default new Main();