import { useContext } from 'react';
import './Header.css';
import UserContext from '../../contexts/UserContext';
import Nav from './Nav/Nav';

function Header() {
    const { isSavedNews } = useContext(UserContext);

    return (
        <div className='header'>
            <p className={isSavedNews ? 'header__title header__title_alt' : 'header__title'}>NewsExplorer</p>
            <Nav />
        </div>
    )
}

export default Header;
