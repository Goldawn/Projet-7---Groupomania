// on récupère une paire clé/valeur et on la stocke dans le localStorage
const saveData = (key, value) => {
if(localStorage){
    localStorage.setItem(key, value);
}else {
    alert("Web Storage is not supported");
}
}

export default saveData;