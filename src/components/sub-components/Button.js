import { prices } from "../../prices";

const Button = (props) => {

  function handleClick() {
    props.setUser((prevUser) => {
      return {...prevUser, services: {...prevUser.services, plan: props.name.toLowerCase()}}
    });
  }


  return (
    <button className={`plan-btn ${props.user.services.plan === props.name.toLowerCase() && 'clicked'}`} onClick={handleClick}>
      <img src={props.image} alt={props.name}></img>
      <div className="btn-text-div">
        <h4>{props.name}</h4>
        <p>{`$${prices.plans[props.name.toLowerCase()][props.user.planPeriod]}/${props.planPeriodShort}`}</p>
        {props.user.planPeriod === 'yearly' && <span className="free-months">2 months free</span>}
      </div>
    </button>
  )
}

export default Button;