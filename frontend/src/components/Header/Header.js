import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useContext } from 'react';
import { ThemeContext } from '../../App'
import groupomaniaLogo from '../../logo/icon-left-font.svg'
import groupomaniaWhiteLogo from '../../logo/icon-left-font-monochrome-white.svg'

import './Header.css'

const Header = (props) => {

    const { theme } = useContext(ThemeContext);

    const history = useHistory();
    
    useEffect( () => {
    }, [props.isAuthenticated])

    // on met en place un affichage conditionnel.
    // Si l'utilisateur est authentifié, alors on ajoute les boutons de céonnexion, de profil et le switch du darkmode
    // Sinon on lui affiche le bouton de connection
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

    // on supprime le token du localStorage puis on redirige l'utilisateur
    const disconnect = () => {
        localStorage.removeItem('authToken');
        history.push('/')
    }

    // fonction qui gère la deconnexion de l'utilisateur
    const handleClick = () => {
        disconnect();
    }


    return (
    
    <header>
        <div className="header-container">
            <a href="/">
                <img id="site-logo" className="logo" src={groupomaniaLogo}></img>
                <img id="site-logo-white" className="logo" src={groupomaniaWhiteLogo}></img>
            </a>
            <div id="header-links">
                {renderAuthenticated()}
            </div>
        </div>
    </header>

    )
}
  
export default Header;