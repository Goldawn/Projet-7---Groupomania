import { useContext } from 'react';
import { ThemeContext } from '../../App'
import Switch from 'react-switch';

const ThemeToggle = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

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
                checked={ theme === 'light'}
            />
        </>
    )

}

export default ThemeToggle;