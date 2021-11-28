import React, { useState, useEffect } from 'react';

import ContainerRouter from './components/Router/ContainerRouter';
import Header from './components/Header/Header';

import './App.css'

export const ThemeContext = React.createContext();


const App = (props) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [theme, setTheme] = useState('Light');
  // constructor(props) {
  //   super(props);
  //   this.state = { 
  //     isAuthenticated: "",
  //     auth: ""
  //  };
  // }

  // Context = createContext();

  const loadData = (key) => {
    if(localStorage){
        if(key in localStorage) {
            return localStorage.getItem(key);
        }
    } else {
        alert("Web Storage is not supported");
    }
  }

  // componentDidMount() {
  //   const auth = loadData("authToken")
    
  //   if(!auth) {
  //     console.log("non authentifié")
  //     setIsAuthenticated(false)
  //   }
  //   else {
  //     console.log("authentifié")
  //     setIsAuthenticated(true)
  //   }
  // }

  useEffect( () => {
    const auth = loadData("authToken")
    
    if(!auth) {
      console.log("non authentifié")
      setIsAuthenticated(false)
    }
    else {
      console.log("authentifié")
      setIsAuthenticated(true)
    }
  })
    
  // const isAuthenticated = props.location.state.isAuthenticated;

  return(
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className="App">
        {/* <Context.Provider value={value}> */}
          <ContainerRouter isAuthenticated={isAuthenticated}>
            <Header isAuthenticated={isAuthenticated} />
          </ContainerRouter>
        {/* </Context.Provider>; */}
      </div>
    </ThemeContext.Provider>
    )
}

export default App;