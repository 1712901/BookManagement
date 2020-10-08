function rowDelete(ctl, key) {
    $(ctl).parents("tr").remove();
    sessionStorage.removeItem(key);
}

function refresh(key, value){
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, value);
}

function refreshAll(){
    let keys = Object.keys(sessionStorage);
    document.getElementById("mydiv").value = '';
    for (let key of keys) {
        let val = document.getElementById("mydiv").value;
        document.getElementById("mydiv").value = val+ `${key}`+` ${sessionStorage.getItem(key)} `;
    }
}

function empty(){
    sessionStorage.clear();
}