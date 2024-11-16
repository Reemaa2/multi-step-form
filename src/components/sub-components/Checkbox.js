import React from "react";
import { formatAddOns } from '../../utils';
import { prices } from "../../prices";

const Checkbox = (props) => {

  const handleClick = () => {
    props.setUser(prevUser => {
      const currentValue = prevUser.services.addOns[props.name];

      return {
        ...prevUser,
        services: {
          ...prevUser.services,
          addOns: {
            ...prevUser.services.addOns,
            [props.name]: !currentValue,
          }
        }
      };
    });
  }

  const handleChange = (event) => {
    const {name, checked} = event.target;

    props.setUser(prevUser => ({
      ...prevUser,
      services: {
        ...prevUser.services,
        addOns: {
          ...prevUser.services.addOns,
          [name]: checked,
        },
      },
    }));
  }



  return (
    <div className={`checkbox-div ${props.user.services.addOns[props.name] && 'clicked'}`} onClick={handleClick}>

      <div className="checkbox-text-contianer">
        <input 
          type="checkbox"
          name={props.name}
          checked={props.user.services.addOns[props.name]}
          onChange={handleChange}
        ></input>
        <div className="checkbox-text-div">
          
          <h4>{formatAddOns(props.name)}</h4>
          <p>{props.info}</p>
        </div>
      </div>
      

      <span>{`+$${prices.addOns[props.name][props.user.planPeriod]}/${props.planPeriodShort}`}</span>
    </div>
  )
}

export default Checkbox;