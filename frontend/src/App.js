import React, { useState, useEffect } from 'react';

import ContainerRouter from './components/Router/ContainerRouter';
import Header from './components/Header/Header';

import './App.css'

export const ThemeContext = React.createContext();


const App = (props) => {
  
  const [tokenExistsInLocalStorage, setTokenExistsInLocalStorage] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') || 'light');
 
// On récupère une valeur dans le localStorage
  const loadData = (key) => {
    if(localStorage){
        if(key in localStorage) {
            return localStorage.getItem(key);
        }
    } else {
        alert("Web Storage is not supported");
    }
  }

  // On vérifie si l'utilisateur possède un token dans son localStorage
  useEffect(() => {
    const auth = loadData("authToken")
    
    if(!auth) {
      setTokenExistsInLocalStorage(false)
    }
    else {
      setTokenExistsInLocalStorage(true)
    }
  }, [])

  // On vérifie que le token est fonctionnel, sinon on retourne un false dans le state d'authentification 
  useEffect( () => { 
    if(tokenExistsInLocalStorage) {
      const auth = JSON.parse(loadData("authToken"))
      const bearer = "Bearer "+auth.token
  
      fetch('http://localhost:9000/api/user/auth', { 
        method: 'GET', 
        headers: {
          "Content-Type": "application/json",
          "authorization": bearer 
        }
      })
      .then((res) => {
      if(res.status === 200 ) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }}
      )   
    }
    else {
      setIsAuthenticated(false)
    }
  }, [tokenExistsInLocalStorage])

  return(
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div id="App" className={theme}>
          <ContainerRouter isAuthenticated={isAuthenticated}>
            <Header isAuthenticated={isAuthenticated} />
          </ContainerRouter>
      </div>
    </ThemeContext.Provider>
    )
}

export default App;