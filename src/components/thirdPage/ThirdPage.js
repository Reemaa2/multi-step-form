import './thirdPage.css';
import Checkbox from '../sub-components/Checkbox';
import React from 'react';


const ThirdPage = (props) => {

  return (
    <section>
      <div className='page-container'>
        <div className="text-div">
          <h2>Pick add-ons</h2>
          <p>Add-ons help enhance your gaming experience.</p>
        </div>

        <div className='checkboxes-container'>
          <Checkbox 
            name='onlineService'
            info='Access to multiplayer games'
            user={props.user} 
            setUser={props.setUser}
            planPeriodShort={props.planPeriodShort}
          />

          <Checkbox 
            name='largerStorage'
            info='Extra 1TB of cloud save'
            user={props.user} 
            setUser={props.setUser}
            planPeriodShort={props.planPeriodShort}
          />

          <Checkbox 
            name='customizableProfile'
            info='Custom theme on your porfile'
            user={props.user} 
            setUser={props.setUser}
            planPeriodShort={props.planPeriodShort}
          />
        </div>
        
      </div>
    </section>
  )
}

export default ThirdPage;