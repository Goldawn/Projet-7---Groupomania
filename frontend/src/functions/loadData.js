// on récupère la valeur associée à une clé passé en paramètre dans le localStorage
const loadData = (key) => {
    if(localStorage){
      if(key in localStorage) {
          return localStorage.getItem(key);
        }
      } else {
      alert("Web Storage is not supported");
    }
}

export default loadData;