import "./LoginModal.css";
import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm";
import { useForm } from "../../../hooks/useForm";
import ModalContext from "../../../contexts/ModalContext";
import UserContext from "../../../contexts/UserContext";
import { NavLink } from "react-router-dom";

const LoginModal = () => {
  const { isLoading } = useContext(UserContext);
  const { handleLogin, modalOptions, handleModalChange } = useContext(ModalContext);
  const { loginFormName, loginTitle, loginButton, signupButton, loginLoadingText } = modalOptions.loginOptions;
  const { values, handleChange, setValues } = useForm(modalOptions.loginValues);
  const { email, password } = values;

  useEffect(() => {
    setValues(modalOptions.loginValues);
  }, [setValues, modalOptions.loginValues]);

  const handleUserLogin = () => {
    handleLogin(values);
  };

  return (
    <ModalWithForm handleSubmit={handleUserLogin} formName={loginFormName}>
      <h3 className="modal__title">{loginTitle}</h3>
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
      
      <div className="form__button-group">
        <button className="form__submit" type="submit">
          {isLoading ? loginLoadingText : loginButton}
        </button>
        <p className="form__text">
          or{" "}
          <NavLink className="form__link" to={"/news-explorer-frontend/"} onClick={() => handleModalChange("signup")}>
             {signupButton}
          </NavLink>
        </p>
      </div>
    </ModalWithForm>
  )
}

export default LoginModal;
