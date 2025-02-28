import './Nav.css';
import { useContext } from 'react';
import navButtonBorder from '../../../images/nav-button-border.svg';
import logoutButton from '../../../assets/logout-button-image.svg';
import UserContext from '../../../contexts/UserContext';

function Nav() {
    const { isLoggedIn, user } = useContext(UserContext);

    return (isLoggedIn) ? (
        <div className='nav nav_login'>
            <a className='nav__link' href='/'>
                Home
            </a>
            <a className='nav__link' href='/saved-news'>
                Saved articles
            </a>
            <button className='nav__link nav__button nav__button_login' type='button' border-image={navButtonBorder}>
                <img className='nav__img nav__img_profile' src={navButtonBorder} alt='button border' />
                {user.name ? user.name.split()[0].charAt(0).toUpperCase()+user.name.split()[0].slice(1) : "Unknown"}
                <img className='nav__img nav__img_logout' src={logoutButton} alt='logout' />
            </button>
        </div>
    ) : (
        <div className='nav'>
            <a className='nav__link' href='/'>
                Home
            </a>
            <button className='nav__link nav__button' type='button' border-image={navButtonBorder}>
                <img className='nav__img' src={navButtonBorder} alt='button border' />
                Sign In
            </button>
        </div>
    )
}

export default Nav;
