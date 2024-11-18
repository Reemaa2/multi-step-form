import React from 'react';
import './secondPage.css';
import Button from '../sub-components/Button';
import arcadeIcon from '../../assets/images/icon-arcade.svg';
import advancedIcon from '../../assets/images/icon-advanced.svg';
import proIcon from '../../assets/images/icon-pro.svg';


const SecondPage = (props) => {

  function handleChange() {
    props.setUser((prevUser) => {
      const newPlanPeriod = prevUser.planPeriod === 'monthly'? 'yearly' : 'monthly';
      props.setPlanPeriodShort(newPlanPeriod === 'monthly' ? 'mo' : 'yr');
      return {...prevUser, planPeriod: newPlanPeriod}
    }); 
    
    
  }


  return (
    <section>
      <div className='page-container'>
        
        <div className="text-div">
          <h2>Select your plan</h2>
          <p>You have the option of monthly or yearly billing.</p>
        </div>

        
        <div className="btns-container">
          <Button 
            image={arcadeIcon}
            name='Arcade'
            user={props.user} 
            setUser={props.setUser}
            planPeriodShort={props.planPeriodShort}
          />

          <Button 
            image={advancedIcon}
            name='Advanced'
            user={props.user} 
            setUser={props.setUser}
            planPeriodShort={props.planPeriodShort}
          />

          <Button 
            image={proIcon}
            name='Pro'
            user={props.user} 
            setUser={props.setUser}
            planPeriodShort={props.planPeriodShort}
          />
        </div>
        

        <div className='toggle-div'>
          <span className={`plan-period ${props.user.planPeriod === 'monthly' && 'selected-plan'}`}>Monthly</span>
          <input 
            type='checkbox'  
            className='toggle-input'
            name='planPeriod'
            checked={props.user.planPeriod === 'monthly'}
            onChange={handleChange}
          ></input>
          <span className={`plan-period ${props.user.planPeriod === 'yearly' && 'selected-plan'}`}>Yearly</span>
        </div>
        
      </div>
    </section>
  )
}

export default SecondPage;