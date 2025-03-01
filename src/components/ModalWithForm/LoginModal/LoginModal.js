import "./LoginModal.css";
import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm";
import { useForm } from "../../../hooks/useForm";
import ModalContext from "../../../contexts/ModalContext";
import { modalOptions } from "../../../utils/constants";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const LoginModal = () => {
    const initialValues = {
        email: "",
        password: "",
    };

    const { handleLogin, isLoading, handleModalChange } = useContext(ModalContext);
    const { loginFormName, loginTitle, loginButton, signupButton, loginLoadingText } = modalOptions.loginOptions;
    const { values, handleChange, setValues } = useForm(initialValues);

    const { email, password } = values;
    useEffect(() => {
      setValues(initialValues);
    }, [setValues]);

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
          placeholder="Email"
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
          placeholder="Password"
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
        <NavLink className="form__link" to={"/"} onClick={() => handleModalChange("signup")}>
          <p className="form__text">or {signupButton}</p>
        </NavLink>
      </div>
    </ModalWithForm>
  )
}

export default LoginModal;
