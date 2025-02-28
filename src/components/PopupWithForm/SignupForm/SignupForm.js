import './SignupForm.css';
import { formTextOptions } from '../../../utils/';

function SignupForm() {
    const { signupText, signinText, emailText, passwordText, usernameText } = formTextOptions

    return (
        <form className='popup__form form'>
            <h2 className='form__title'>{signupText}</h2>
            <label className='form__label form__text'>
                {emailText}
                <input className='form__input' type='email' placeholder='Enter email'></input>
            </label>
            <label className='form__label form__text'>
                {passwordText}
                <input className='form__input' type='password' placeholder='Enter password'></input>
            </label>
            <label className='form__label form__text'>
                {usernameText}
                <input className='form__input' type='text' placeholder='Enter your username'></input>
            </label>
            <button className='form__button_submit'>{signupText}</button>
            <p className='form__link'>or <a className='form__link_anchor'>{signinText}</a></p>
        </form>
    )
}

export default SignupForm;
