import React from "react";
// import "./Form.css";

const Input = (props) => {
  // const {enteredName, nameBlureHandler, nameChangeHandler, inputIsInvalid, label, inputHasError} = props
  const {
    label, id, type, value, onChange, inputIsInvalid, onBlur, inputHasError, className
  } = props;
  const inputClasses = inputIsInvalid ? "form-control invalid" : "form-control";
  return (
    <div className={inputClasses}>
      <label htmlFor="name">{label}</label>
      <input
        type={type ? type : "text"}
        id={id || ""}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {inputHasError && (
        <p className="error-text">{`${label} must not be empty`}</p>
      )}
    </div>
  );
};

export default Input;
