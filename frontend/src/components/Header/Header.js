import './Header.css'

function Header() {

    const handleClick = () => {

    }

    return (
    
    <header>
        <div className="header-container">
            <h1><a href="/">Groupomania</a></h1>
            <div id="header-links">
                <p><a href="/profile">Profil</a></p>
                <p><a href="/login">Connexion</a></p>
                <button onClick={handleClick} >Déconnexion</button>
            </div>
        </div>
    </header>

    )
}
  
export default Header;