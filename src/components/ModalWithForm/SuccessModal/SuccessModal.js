import { useContext } from "react";
import "./SuccessModal.css";
import ModalWithForm from "../ModalWithForm";
import ModalContext from "../../../contexts/ModalContext";
import { NavLink } from "react-router-dom";

const SuccessModal = () => {
    const { modalOptions, handleModalChange } = useContext(ModalContext);
    const { successFormName, successTitle, successText } = modalOptions.successOptions;

    return (
        <ModalWithForm formName={successFormName}>
            <h3 className="modal__title">{successTitle}</h3>
            <NavLink className="form__link" to={"/"} onClick={() => handleModalChange("signin")}>
                {successText}
            </NavLink>
        </ModalWithForm>
    )
}

export default SuccessModal;
