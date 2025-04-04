import { useContext, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm";
import ModalContext from "../../../contexts/ModalContext";
import UserContext from "../../../contexts/UserContext";
import { useForm } from "../../../hooks/useForm";
import { NavLink } from "react-router-dom";

const RegisterModal = () => {
  const { isLoading } = useContext(UserContext);
  const { handleRegistration, modalOptions, handleModalChange } = useContext(ModalContext);
  const { signupFormName, signupTitle, loginButton, signupButton, signupLoadingText } = modalOptions.loginOptions;
  const { values, handleChange, setValues } = useForm(modalOptions.registrationValues);

  const { name, email, password } = values;
  useEffect(() => {
    setValues(modalOptions.registrationValues);
  }, [setValues, modalOptions.registrationValues]);

  const handleUserRegistration = () => {
    handleRegistration(values);
  };

  return (
    <ModalWithForm handleSubmit={handleUserRegistration} formName={signupFormName}>
      <h3 className="modal__title">{signupTitle}</h3>
      <label className="form__label" htmlFor={"user-email"}>
        Email
        <input
            className="form__input"
            id="user-email"
            name="email"
            placeholder="Enter email"
            minLength="2"
            maxLength="40"
            type="email"
            value={email}
            onChange={handleChange}
            required
        />
      </label>

      <label className="form__label" htmlFor={"user-password"}>
        Password
        <input
            className="form__input"
            id="user-password"
            name="password"
            placeholder="Enter password"
            minLength="2"
            maxLength="40"
            type="password"
            value={password}
            onChange={handleChange}
            required
        />
      </label>

      <label className="form__label" htmlFor={"user-name"}>
        Name
        <input
            className="form__input"
            id="user-name"
            name="name"
            placeholder="Enter your username"
            minLength="2"
            maxLength="40"
            type="text"
            value={name}
            onChange={handleChange}
            required
        />
      </label>

      <div className="form__button-group">
        <button className="form__submit" type="submit">
          {isLoading ? signupLoadingText : signupButton}
        </button>
        <p className="form__text">
          or{" "}
          <NavLink className="form__link" to={"/"} onClick={() => handleModalChange("signin")}>
            {loginButton}
          </NavLink>
        </p>
      </div>
    </ModalWithForm>
  )
}

export default RegisterModal;
