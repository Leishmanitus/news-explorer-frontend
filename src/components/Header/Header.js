import './Header.css';
import Nav from './Nav/Nav';

function Header() {
    return (
        <div className='header'>
            <p className='header__title'>News Explorer</p>
            <Nav />
        </div>
    )
}

export default Header;
