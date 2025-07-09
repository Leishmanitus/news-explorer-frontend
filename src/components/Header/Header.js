import { useContext } from 'react';
import './Header.css';
import UserContext from '../../contexts/UserContext';
import Nav from './Nav/Nav';

function Header() {
    const { isSavedNews } = useContext(UserContext);

    return (
        <header className='header'>
            <h1 className={isSavedNews ? 'header__title header__title_alt' : 'header__title'}>NewsExplorer</h1>
            <Nav />
        </header>
    )
}

export default Header;
