import { useContext } from "react";
import "./ModalWithForm.css";
import { useEscape } from "../../hooks/useEscape";
import ModalContext from "../../contexts/ModalContext";

function ModalWithForm({ children, handleSubmit, formName }) {
  const { handleClose, handleOverlay, activeModal } = useContext(ModalContext);

  useEscape(handleClose);

  return (
    activeModal === "success" ?
      <div onClick={(event) => handleOverlay(event)} className={`modal modal__type_${formName}`}>
        <div className={`modal__container modal__container_${formName}`}>
          <form
            className={`modal__form form form_${formName}`}
            name={formName}
            id={formName}
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            {children}
          </form>
          <span className="modal__close-button" onClick={handleClose} />
        </div>
      </div>
      :
      <div onClick={(event) => handleOverlay(event)} className={`modal modal__type_${formName}`}>
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
          <span className="modal__close-button" onClick={handleClose} />
        </div>
      </div>
  );
}

export default ModalWithForm;
