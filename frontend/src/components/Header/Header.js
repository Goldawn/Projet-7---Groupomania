import React, { useState } from 'react';

import './Header.css'

function Header(props) {

    useState( () => {
        if(props.isAuthenticated) {
            console.log('oui')
        }
        else {
            console.log('non')
        }
    })

    const disconnect = () => {
        return localStorage.removeItem('authToken');
    }

    const handleClick = () => {
        disconnect();
    }


    return (
    
    <header>
        <div className="header-container">
            <h1><a href="/">Groupomania</a></h1>
            <div id="header-links">
                <a href="/profile">Profil</a>
                <a href="/login">Connexion</a>
                <button onClick={handleClick} >Déconnexion</button>
            </div>
        </div>
    </header>

    )
}
  
export default Header;