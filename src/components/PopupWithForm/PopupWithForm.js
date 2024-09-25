import './PopupWithForm.css';

function PopupWithForm({children, handleSubmit, formName}) {

    return (
        <div className={`popup popup_type_${formName}`}>
            <div className='popup__container'>
                <form
                    className='popup__form form'
                    name={formName}
                    id={formName}
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit();
                    }}
                >
                    {children}
                </form>
                <button className='popup__button_close' onClick={''} />
            </div>
        </div>
    );
}

export default PopupWithForm;
