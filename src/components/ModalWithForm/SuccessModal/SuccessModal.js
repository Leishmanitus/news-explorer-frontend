import { useContext } from "react";
import "./SuccessModal.css";
import ModalWithForm from "../ModalWithForm";
import ModalContext from "../../../contexts/ModalContext";

const SuccessModal = () => {
    const { modalOptions, handleModalChange } = useContext(ModalContext);
    const { successFormName, successTitle, successText } = modalOptions.successOptions;

    const handleSubmit = () => {
        handleModalChange("signin");
    }

    return (
        <ModalWithForm handleSubmit={handleSubmit} formName={successFormName}>
            <h3 className="modal__title">{successTitle}</h3>
            <button className="form__submit form__submit_success" type="submit">
                {successText}
            </button>
        </ModalWithForm>
    )
}

export default SuccessModal;
