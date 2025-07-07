import './Footer.css';
import socialFacebook from '../../assets/social-fb.svg';
import socialGithub from '../../assets/social-gh.svg';

function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__copyright'>&copy; 2024 News Explorer, Powered by News API</p>
            <div className='footer__group'>
                <ul className='footer__link-group'>
                    <li className='footer__list-item'><a className='footer__link' href='/'>Home</a></li>
                    <li className='footer__list-item'><a className='footer__link' href='https://tripleten.com' target='_blank' rel='noopener noreferrer'>TripleTen</a></li>
                </ul>
                <ul className='footer__social-group'>
                    <li className='footer__list-item'><a className='footer__social-link' href='https://github.com/Leishmanitus' target='_blank' rel='noopener noreferrer'><img className='footer__social' src={socialGithub} alt='GitHub Icon' /></a></li>
                    <li className='footer__list-item'><a className='footer__social-link' href='https://www.facebook.com/tyler.leishman3/' target='_blank' rel='noopener noreferrer'><img className='footer__social' src={socialFacebook} alt='Facebook Icon' /></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
