import './Nav.css';
import { useContext } from 'react';
import navButtonBorder from '../../../assets/nav-button-border.svg';
import logoutButton from '../../../assets/logout-button-image.svg';
import blackLogoutButton from '../../../assets/black-logout-button-image.svg';
import UserContext from '../../../contexts/UserContext';

function Nav() {
    const { isLoggedIn, isSavedNews, user, setActiveModal, handleLogout } = useContext(UserContext);
    const userName = typeof user.name === String ? user.name.split(' ')[0].charAt(0).toUpperCase()+user.name.split(' ')[0].slice(1) : user.name;

    const handleAltClassName = (className) => {
        return isSavedNews ? `${className} ${className}_alt` : className;
    };

    return (isLoggedIn) ? (
        <div className='nav nav_login'>
            <a className={handleAltClassName('nav__link')} href='/'>
                <p className={handleAltClassName('nav__text')}>Home</p>
            </a>
            <a className={handleAltClassName('nav__link')} href='/saved-news'>
                <p className={handleAltClassName('nav__text')}>Saved articles</p>
            </a>
            <div className={`${handleAltClassName('nav__link')} ${handleAltClassName('nav__profile')} nav__profile_login`} border-image={navButtonBorder}>
                <p className={`${handleAltClassName('nav__text')} nav__text_profile`}>{user.name ? userName : "Anonymous"}</p>
                <img className='nav__img nav__img_logout' src={isSavedNews ? blackLogoutButton : logoutButton} alt='logout' onClick={() => handleLogout()} />
            </div>
        </div>
    ) : (
        <div className='nav'>
            <a className='nav__link' href='/'>
                Home
            </a>
            <div className={`nav__link nav__profile`} border-image={navButtonBorder} onClick={() => setActiveModal('signin')}>
                <p className='nav__text'>Sign In</p>
            </div>
        </div>
    )
}

export default Nav;
