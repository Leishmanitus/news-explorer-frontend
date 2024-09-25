import './LoginForm.css';
import { formTextOptions } from '../../../utils/';

function LoginForm() {
    const { signupText, signinText, emailText, passwordText } = formTextOptions

    return (
        <form className='popup__form form'>
            <h2 className='form__title'>{signinText}</h2>
            <label className='form__label form__text'>
                {emailText}
                <input className='form__input' type='email' placeholder='Enter email'></input>
            </label>
            <label className='form__label form__text'>
                {passwordText}
                <input className='form__input' type='password' placeholder='Enter password'></input>
            </label>
            <button className='form__button_submit'>{signinText}</button>
            <p className='form__link'>or <a className='form__link_anchor'>{signupText}</a></p>
        </form>
    )
}

export default LoginForm;
