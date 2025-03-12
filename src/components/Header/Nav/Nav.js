import './Nav.css';
import { useContext } from 'react';
import navButtonBorder from '../../../assets/nav-button-border.svg';
import blackNavButtonBorder from '../../../assets/black-nav-button-border.svg';
import logoutButton from '../../../assets/logout-button-image.svg';
import blackLogoutButton from '../../../assets/black-logout-button-image.svg';
import UserContext from '../../../contexts/UserContext';

function Nav() {
    const { isLoggedIn, isSavedNews, user, setActiveModal } = useContext(UserContext);
    const userName = user.name.split(' ')[0].charAt(0).toUpperCase()+user.name.split(' ')[0].slice(1);

    const handleLinkClassName = () => {
        return isSavedNews ? 'nav__link nav__link_alt' : 'nav__link'
    };

    return (isLoggedIn) ? (
        <div className='nav nav_login'>
            <a className={handleLinkClassName()} href='/'>
                Home
            </a>
            <a className={handleLinkClassName()} href='/saved-news'>
                Saved articles
            </a>
            <button className={`${handleLinkClassName()} nav__button nav__button_login`} type='button' border-image={navButtonBorder}>
                <img className='nav__img nav__img_profile' src={isSavedNews ? blackNavButtonBorder : navButtonBorder} alt='button border' />
                <p>{user.name ? userName : "Anonymous"}</p>
                <img className='nav__img nav__img_logout' src={isSavedNews ? blackLogoutButton : logoutButton} alt='logout' />
            </button>
        </div>
    ) : (
        <div className='nav'>
            <a className='nav__link' href='/'>
                Home
            </a>
            <button className='nav__link nav__button' type='button' border-image={navButtonBorder} onClick={() => setActiveModal('signin')}>
                <img className='nav__img' src={navButtonBorder} alt='button border' />
                Sign In
            </button>
        </div>
    )
}

export default Nav;
