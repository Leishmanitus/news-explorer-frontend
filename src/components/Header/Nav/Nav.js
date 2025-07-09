import './Nav.css';
import { useContext, useState, useEffect } from 'react';
import navButtonBorder from '../../../assets/nav-button-border.svg';
import logoutButton from '../../../assets/logout-button-image.svg';
import blackLogoutButton from '../../../assets/black-logout-button-image.svg';
import UserContext from '../../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { useEscape } from '../../../hooks/useEscape';

function Nav() {
    const { isLoggedIn, isSavedNews, user, setActiveModal, handleLogout } = useContext(UserContext);
    const userName = typeof user.name === String ? user.name.split(' ')[0].charAt(0).toUpperCase()+user.name.split(' ')[0].slice(1) : user.name;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    useEscape(() => setIsBurgerMenuOpen(false));

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 425;

    const handleAltClassName = (className) => {
        return isSavedNews ? `${className} ${className}_alt` : `${className}`;
    };

    const burgerMenu = (
        <button
            className={`${handleAltClassName('burger__icon')}`}
            type='button'
            onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
        />
    );

    return isMobile ? (
        <>
            {isBurgerMenuOpen ? (
                <nav className={'nav nav_burger nav__burger_active'}>
                    {isLoggedIn ? (
                        <>
                            <div className='burger__header'>
                                <h1 className='header__title'>NewsExplorer</h1>
                                <button className='burger__close-button' type='button' onClick={() => setIsBurgerMenuOpen(false)} />
                            </div>
                            <ul className='burger__list'>
                                <Link className='burger__link' to='/' onClick={() => setIsBurgerMenuOpen(false)}>
                                    <p className='nav__text'>Home</p>
                                </Link>
                                <Link className='burger__link' to='saved-news' onClick={() => setIsBurgerMenuOpen(false)}>
                                    <p className='nav__text'>Saved articles</p>
                                </Link>
                                <div className='nav__logout nav__profile nav__profile_burger' border-image={navButtonBorder}>
                                    <p className='nav__text nav__text_profile' >{user.name ? userName : "Anonymous"}</p>
                                    <Link className='nav__logout' to='/' onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                                        <img className='nav__img nav__img_logout' src={logoutButton} alt='logout' />
                                    </Link>
                                </div>
                            </ul>
                        </>
                    ) : (
                        <>
                            <div className='burger__header'>
                                    <h1 className='header__title'>NewsExplorer</h1>
                                    <button className='burger__close-button' type='button' onClick={() => setIsBurgerMenuOpen(false)} />
                                </div>
                            <ul className='burger__list'>
                                <Link className='burger__link' to='/' onClick={() => setIsBurgerMenuOpen(false)}>
                                    <p className='nav__text'>Home</p>
                                </Link>
                                <div className='nav__profile nav__profile_burger' border-image={navButtonBorder} onClick={() => {setActiveModal('signin'); setIsBurgerMenuOpen(false);}}>
                                    <p className='nav__text'>Sign In</p>
                                </div>
                            </ul>
                        </>
                    )}
                </nav>
            ) : (burgerMenu)}
        </>
    ) : (isLoggedIn ? (
        <nav className='nav nav_login'>
            <Link className={handleAltClassName('nav__link')} to='/'>
                <p className={handleAltClassName('nav__text')}>Home</p>
            </Link>
            <Link className={handleAltClassName('nav__link')} to='saved-news'>
                <p className={handleAltClassName('nav__text')}>Saved articles</p>
            </Link>
            <div className={`${handleAltClassName('nav__logout')} ${handleAltClassName('nav__profile')}`} border-image={navButtonBorder}>
                <p className={`${handleAltClassName('nav__text')} nav__text_profile`}>{user.name ? userName : "Anonymous"}</p>
                <Link className='nav__logout' to='/' onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                    <img className='nav__img nav__img_logout' src={isSavedNews ? blackLogoutButton : logoutButton} alt='logout' onClick={() => handleLogout()} />
                </Link>
            </div>
        </nav>
    ) : (
        <nav className='nav'>
            <Link className={handleAltClassName('nav__link')} to='/'>
                Home
            </Link>
            <div className={`nav__link ${handleAltClassName('nav__profile')}`} border-image={navButtonBorder} onClick={() => setActiveModal('signin')}>
                <p className={handleAltClassName('nav__text')}>Sign In</p>
            </div>
        </nav>
    ))
}

export default Nav;
