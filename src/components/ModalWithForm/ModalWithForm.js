import { useContext } from "react";
import "./ModalWithForm.css";
import { useEscape } from "../../hooks/useEscape";
import ModalContext from "../../contexts/ModalContext";

function ModalWithForm({ children, handleSubmit, formName }) {
  const { handleClose, handleOverlay, activeModal } = useContext(ModalContext);

  useEscape(handleClose);

  return (
    <div onClick={(event) => handleOverlay(event)} className={`modal modal_type_${formName}`}>
      <div className={`modal__container`}>
        {
          activeModal === "success" ?
              <div className="modal__success">{children}</div>
            :
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
        }
        <button className="modal__close-button" onClick={handleClose} />
      </div>
    </div>
  );
}

export default ModalWithForm;
