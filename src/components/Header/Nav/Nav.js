import './Nav.css';
import navButtonBorder from '../../../images/nav-button-border.svg';

//call constants for button text

function Nav() {
    return (
        <div className='nav'>
            <a className='nav__link' href='/'>
                Home
            </a>
            {/* <hr className='nav__link-border nav__link-border_hidden' /> */}
            <a className='nav__link nav__link_hidden' href='/'>
                Saved Articles
            </a>
            {/* <hr className='nav__link-border nav__link-border_hidden' /> */}
            <button className='nav__link nav__button' type='button' border-image={navButtonBorder}>
                <img className='nav__img' src={navButtonBorder} alt='button border' />
                Sign In
            </button>
            {/* <hr className='nav__link-border nav__link-border_hidden' /> */}
        </div>
    )
}

export default Nav;
