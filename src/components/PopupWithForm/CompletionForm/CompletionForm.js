import './CompletionForm.css';
import { formTextOptions } from '../../../utils/';

function CompletionForm() {
    const { completionText, signinText } = formTextOptions

    return (
        <form className='popup__form form'>
            <h2 className='form__title_complete'>{completionText}</h2>
            <a className='form__link form__link_anchor form__link_complete'>{signinText}</a>
        </form>
    )
}

export default CompletionForm;
