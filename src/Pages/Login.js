import React from "react";
import useInput from "../hooks/input-hooks";
import Card from "../Components/common/Card";
import Input from "../Components/common/Input";
import styles from "./Login.module.css";
import Button from "../Components/common/Button";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const validatePassword = (value) => {
    return value.trim() !== "";
  };

  const {
    value: passwordInput,
    isValid: isUsertNameValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useInput(validatePassword);

  const validateEmail = (value) => {
    return value.trim() !== "" || value.includes("@");
  };
  const {
    value: emailInput,
    isValid: isEmailValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  let formIsValid = false;
  if (isUsertNameValid && isEmailValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    resetEmail();
    resetPassword();
  };

  const loginHandler = () => {
    history.push('./tasks');
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className="control-group">
          <Input
            label="Email"
            id="email"
            value={emailInput}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
            inputHasError={emailInputHasError}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={passwordInput}
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
            inputHasError={passwordInputHasError}
          />
        </div>
        <div className="form-actions">
          <Button onClick={loginHandler} text="Submit" type="submit" isValid={formIsValid} />
        </div>
      </form>
    </Card>
  );
};

export default Login;
