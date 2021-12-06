import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../App'
import Switch from 'react-switch';

const ThemeToggle = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const saveData = (key, value) => {
        if(localStorage){
            localStorage.setItem(key, value);
        }else {
            alert("Web Storage is not supported");
        }
    }

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark-theme' : 'light');
    }

    useEffect(() => {
        console.log('reset le localStorage')
        saveData('theme', theme);        
    }, [theme])

    return (
        <>
            <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={20}
                width={40}
                height={20}
                onColor={'#e1e1e1'}
                onChange={handleThemeToggle}
                checked={ theme === 'dark-theme'}
            />
        </>
    )

}

export default ThemeToggle;