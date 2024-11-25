import React from 'react';
import thankImage from '../assets/images/icon-thank-you.svg';
import { formatAddOns } from '../utils';
import { prices } from '../prices';


const ForthPage = (props) => {

  const [addOnsList, setAddOnsList] = React.useState([]);


  const getAddOnsList = React.useCallback(() => {
    const addOnsList = Object.keys(props.user.services.addOns)
      .filter(key => props.user.services.addOns[key]);
    return addOnsList;
  }, [props.user.services.addOns]);

  React.useEffect(() => {
    const list = getAddOnsList();
    setAddOnsList(list);
  }, [getAddOnsList]);

  

  function goToSecondPage() {
    props.setPages(prevPages => 
      prevPages.map(pageObj => 
        pageObj.number === 'four' 
          ? { ...pageObj, status: false } 
          : pageObj.number === 'two' 
          ? { ...pageObj, status: true } 
          : pageObj
      )
    );
  }

  function calculateTotal() {
    const  {services: { plan: planName }, planPeriod } = props.user;
    const planPrice = prices.plans[planName][planPeriod];

    const addOnslist = getAddOnsList();
    if(!addOnsList.length) return planPrice;
    
    const totalAddOnsPrice = addOnslist.reduce((total, addOn) => {
      return total + prices.addOns[addOn][planPeriod];
    }, 0);

    return planPrice + totalAddOnsPrice;
  }


  
  const addOnsElement = addOnsList.map((addOn) => {
    return (
      <div className="add-on" key={addOn}>
        <p>{formatAddOns(addOn)}</p>
        <span>{`+$${prices.addOns[addOn][props.user.planPeriod]}/${props.planPeriodShort}`}</span>
      </div>
    )
  })


  if(props.confirm) {
    return (
      <section>
        <div className='page-container'>
          <div className='thanks-div'>
            <img src={thankImage} alt='checked'></img>
            <h2>Thank you!</h2>
            <p>Thanks for confiming your subscription!</p>
            <p className='wishes-p'>We hope you have fun using our platform. If you ever need support,
              please feel free to email us at support@loremgaming.com.
            </p>
          </div>
        </div>
      </section>
    )
  }


  return (
    <section>
      <div className='page-container'>
        <div className="page-info">
          <h2>Finishing up</h2>
          <p>Double-check everything looks OK before confirming.</p>
        </div>


        <div className='checkout'>
          <div className="calculation-div">
            
            <div className="plan-calc">
              <div className="plan-calc-text">
                <p>{`${props.user.services.plan.charAt(0).toUpperCase() + props.user.services.plan.slice(1)} 
                  (${props.user.planPeriod.charAt(0).toUpperCase() + props.user.planPeriod.slice(1)})`}
                </p>
                <div className='span-div'>
                  <span onClick={goToSecondPage}>Change</span>
                </div>
              </div>

              <div className="plan-price">{`$${prices.plans[props.user.services.plan][props.user.planPeriod]}/${props.planPeriodShort}`}</div>
            </div>

            <div className="line"></div>

            <div className="add-ons-calc">
              {addOnsElement}
            </div>

          </div>

          <div className="total-div">
            <p>Total (per {props.user.planPeriod === 'monthly' ? 'month' : 'year'})</p>
            <span>{`$${calculateTotal()}/${props.planPeriodShort}`}</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ForthPage;
