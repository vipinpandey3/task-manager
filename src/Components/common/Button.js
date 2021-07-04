import React from "react";

const Button = (props) => {
  const { text, isValid, type, className, onClick } = props;
  return (
    <div>
      <button className={className} onClick={onClick} disabled={!isValid} type={type}>
        {text}
      </button>
    </div>
  );
};

export default Button;
