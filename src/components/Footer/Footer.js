import './Footer.css';
import socialFacebook from '../../assets/social-fb.png';
import socialGithub from '../../assets/social-gh.png';

function Footer() {
    return (
        <div className='footer'>
            <p className='footer__copyright'>&copy; 2024 News Explorer, Powered by News API</p>
            <div className='footer__group'>
                <div className='footer__link-group'>
                    <a className='footer__link' href='/'>Home</a>
                    <a className='footer__link' href='https://tripleten.com'>TripleTen</a>
                </div>
                <div className='footer__social-group'>
                    <a className='footer__social-link' href='https://github.com/Leishmanitus'><img className='footer__social' src={socialGithub} alt='GitHub Icon' /></a>
                    <a className='footer__social-link' href='https://www.facebook.com/tyler.leishman3/'><img className='footer__social' src={socialFacebook} alt='Facebook Icon' /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
