import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useContext } from 'react';
import { ThemeContext } from '../../App'

import './Header.css'

const Header = (props) => {

    const { theme } = useContext(ThemeContext);

    const history = useHistory();
    
    useEffect( () => {
        console.log("in header",props.isAuthenticated)
    }, [props.isAuthenticated])

    const renderAuthenticated = () => {
        if (props.isAuthenticated) {
            return (
                <>
                <a href="/profile">Profil</a>
                <button onClick={handleClick} >Déconnexion</button>
                <ThemeToggle/>
                </>
            )
        } else {
            return (
                <>
                <a href="/login">Connexion</a>
                </>
            )
        } 
    }

    const disconnect = () => {
        localStorage.removeItem('authToken');
        console.log(history)
        history.push('/')
    }

    const handleClick = () => {
        disconnect();
    }


    return (
    
    <header>
        <div className="header-container">
            <h1><a href="/">Groupomania [{theme}]</a></h1>
            <div id="header-links">
                {renderAuthenticated()}
            </div>
        </div>
    </header>

    )
}
  
export default Header;