import React from "react";


const Input = (props) => {

  const [inputIsFocused, setInputIsFocused] = React.useState(false);
  
  const isEmpty = props.emptyValues.includes(props.name);

  const handleChange = (event) => {
    const {name, value} = event.target;

    props.setUser((prevUser) => {
      return {...prevUser, info:{...prevUser.info, [name]: value}}
    });

    if (props.emptyValues.includes(name) && value) {
      props.setEmptyValues((prev) => prev.filter((item) => item !== name));
    }
  }

  const handleFocus = () => {
    setInputIsFocused(true); 
  };

  const handleBlur = () => {
    setInputIsFocused(false);
  };
  



  return (
    <div className="input-div">
      <div className="input-text-div">
        <label>{props.label}</label>
        { isEmpty && <span className="error-message">This field is required</span>} 
        
        {props.name === 'email' && !props.isEmailValid && 
        <span className="error-message">
          Invalid email
        </span>} 
      </div>
      <input 
        className={`first-page-input ${isEmpty  && 'error'} ${inputIsFocused && 'focus'}`}
        placeholder={props.placeholder}
        type={props.name === 'phone' ? 'number' : 'text'}
        name={props.name}
        value={props.user.info[props.name]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></input>
    </div>
  )
}

export default Input;