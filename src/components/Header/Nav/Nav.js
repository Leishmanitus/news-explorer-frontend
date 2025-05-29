import './Nav.css';
import { useContext } from 'react';
import navButtonBorder from '../../../assets/nav-button-border.svg';
import logoutButton from '../../../assets/logout-button-image.svg';
import blackLogoutButton from '../../../assets/black-logout-button-image.svg';
import UserContext from '../../../contexts/UserContext';
import { Link } from 'react-router-dom';

function Nav() {
    const { isLoggedIn, isSavedNews, user, setActiveModal, handleLogout } = useContext(UserContext);
    const userName = typeof user.name === String ? user.name.split(' ')[0].charAt(0).toUpperCase()+user.name.split(' ')[0].slice(1) : user.name;

    const handleAltClassName = (className) => {
        return isSavedNews ? `${className} ${className}_alt` : className;
    };

    return (isLoggedIn) ? (
        <div className='nav nav_login'>
            <Link className={handleAltClassName('nav__link')} to='/'>
                <p className={handleAltClassName('nav__text')}>Home</p>
            </Link>
            <Link className={handleAltClassName('nav__link')} to='saved-news'>
                <p className={handleAltClassName('nav__text')}>Saved articles</p>
            </Link>
            <div className={`${handleAltClassName('nav__link')} ${handleAltClassName('nav__profile')} nav__profile_login`} border-image={navButtonBorder}>
                <p className={`${handleAltClassName('nav__text')} nav__text_profile`}>{user.name ? userName : "Anonymous"}</p>
                <Link className='nav__link nav__link_logout' to='/' onClick={(e) => { e.preventDefault(); setActiveModal('signin'); }}>
                    <img className='nav__img nav__img_logout' src={isSavedNews ? blackLogoutButton : logoutButton} alt='logout' onClick={() => handleLogout()} />
                </Link>
            </div>
        </div>
    ) : (
        <div className='nav'>
            <Link className={handleAltClassName('nav__link')} to='/'>
                Home
            </Link>
            <div className={handleAltClassName(`nav__link nav__profile`)} border-image={navButtonBorder} onClick={() => setActiveModal('signin')}>
                <p className={handleAltClassName('nav__text')}>Sign In</p>
            </div>
        </div>
    )
}

export default Nav;
