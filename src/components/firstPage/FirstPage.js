import './firstPage.css';
import Input from "../sub-components/Input";

const FirstPage = (props) => {
  return (
    <section>
      <div className='page-container'>
        <div className="text-div">
          <h2>Personal info</h2>
          <p>Please provide your name, email, address and phone number</p>
        </div>

        <div>
          <Input
            name='name' 
            label='Name' 
            placeholder="e.g. Stephen King" 
            user={props.user} 
            setUser={props.setUser} 
            emptyValues={props.emptyValues} 
            setEmptyValues={props.setEmptyValues}
          />
          <Input 
            name='email' 
            label='Email Address' 
            placeholder="e.g. Stephenking@lorem.com" 
            user={props.user} setUser={props.setUser} 
            emptyValues={props.emptyValues} 
            setEmptyValues={props.setEmptyValues}
            isEmailValid={props.isEmailValid}
          />
          <Input 
            name='phone' 
            label='Phone Number' 
            placeholder="e.g. +1 234 567890" 
            user={props.user} 
            setUser={props.setUser} 
            emptyValues={props.emptyValues} 
            setEmptyValues={props.setEmptyValues}/>
        </div>
      </div>
    </section>
  )
}

export default FirstPage;