import { useContext } from "react";
import "./ModalWithForm.css";
import ModalContext from "../../contexts/ModalContext";
import { useEscape } from "../../hooks/useEscape";

function ModalWithForm({ children, handleSubmit, formName }) {
  const { handleClose, handleOverlay } = useContext(ModalContext);

  useEscape(handleClose);

  return (
    <div onClick={(event) => handleOverlay(event)} className={`modal modal_type_${formName}`}>
      <div className={`modal__container`}>
        <form
          className="modal__form form"
          name={formName}
          id={formName}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          {children}
        </form>
        <button className="modal__close-button" onClick={handleClose} />
      </div>
    </div>
  );
}

export default ModalWithForm;
