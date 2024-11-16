import React from 'react';
import './App.css';
import backgroundImage from './assets/images/bg-sidebar-mobile.svg';
import backgroundImageBig from './assets/images/bg-sidebar-desktop.svg';
import FirstPage from './components/1-firstPage/FirstPage';
import SecondPage from './components/2-secondPage/SecondPage';
import ThirdPage from './components/3-thirdPage/ThirdPage';
import ForthPage from './components/4-forthPage/ForthPage';
import { isValidEmail } from './utils';


function App() {
 
  const [isDesktopView, setIsDesktopView] = React.useState(window.innerWidth >= 800);
  const [emptyValues, setEmptyValues] = React.useState([]);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [confirm, setConfirm] = React.useState(false);
  const [planPeriodShort, setPlanPeriodShort] = React.useState('mo');
  const [pages, setPages] = React.useState([
    { number: 'one', status: true, label: 'YOUR INFO' },
    { number: 'two', status: false, label: 'SELECT PLAN' },
    { number: 'three', status: false, label: 'ADD-ONS' },
    { number: 'four', status: false, label: 'SUMMARY' }
  ]);
  const [user , setUser] = React.useState({
    id: '',
    info: {
      name: '',
      email: '',
      phone: '',
    },
    services: {
      plan: '',
      addOns: {
        onlineService: false,
        largerStorage: false,
        customizableProfile: false,
      },
    },
    planPeriod: 'monthly',
    total: '',
  });


  const showBackBtn = pages.slice(1, 4).some(page => page.status);
  const showNextBtn = pages.slice(0, 3).some(page => page.status);
  const showConfirmBtn = pages[3].status;



  React.useEffect(() => {
    const watchWidth = () => setIsDesktopView(window.innerWidth >= 800);
    window.addEventListener('resize', watchWidth);
    return () => {
      window.removeEventListener('resize', watchWidth);
    };
  }, []);


  function getCurrentPageObj() {
    return pages.find(page => page.status);
  }

  function togglePageStatus(currentPage, wantedPage) {
    setPages(prevPages => 
      prevPages.map(page => {
        if(page === currentPage) return {...page, status: false};
        if(page === wantedPage) return {...page, status: true};
        return page;
      })
    );
  }

  function goBack() {
    const currentPageObj = getCurrentPageObj();
    const backPageIndex = pages.findIndex(page => page.number === currentPageObj.number) - 1;
    const backPageObj = pages[backPageIndex];
    togglePageStatus(currentPageObj, backPageObj);
  }

  function goNextPage() {
    const currentPageObj = getCurrentPageObj();
    const nextPageIndex = pages.findIndex(page => page.number === currentPageObj.number) + 1;
    const nextPageObj = pages[nextPageIndex];

    if(currentPageObj.number === 'one') {
      if(!validateUserInfo()) return;
    }
    else if(currentPageObj.number === 'two' && !user.services.plan) {
      alert('Please Select a Plan');
      return;
    }
  
    togglePageStatus(currentPageObj, nextPageObj);
  }

  function validateUserInfo() {
    const { email } = user.info; 
    const emptyFields = ['name', 'email', 'phone'].filter(field => !user.info[field]);
  
    if (emptyFields.length > 0) {
      setEmptyValues(emptyFields);
      return false;
    }

    const emailIsValid = isValidEmail(email);
    setIsEmailValid(emailIsValid);
    return emailIsValid;
  }

  function confirming () {
    setConfirm(true);
  }





  const numbersDiv = pages.map((page, index) => (
    <div className='page-num-div' key={page.number}>
      <div className={`page-num ${page.status && 'page-current'}`}>
        <div className={`index ${page.status && 'index-current-page'}`}>{index + 1}</div>
      </div>
      {isDesktopView && 
      <div className='page-text-div'>
        <p>{`STEP ${index + 1}`}</p>
        <span>{page.label}</span>
      </div>}
    </div>
  ));

 

  return (
    <main>
      <div className='app-container'>
        <div className='top-div'>
          {<img src={isDesktopView ? backgroundImageBig : backgroundImage} alt='background' 
            className={`${isDesktopView? 'background-image-big' : 'background-image'}`}>
          </img>}

          <div className='pages-number'>
            {numbersDiv}
          </div>
        </div>

        {pages[0].status && <FirstPage user={user} setUser={setUser} emptyValues={emptyValues} setEmptyValues={setEmptyValues} isEmailValid={isEmailValid}/>}
        {pages[1].status && <SecondPage user={user} setUser={setUser} planPeriodShort={planPeriodShort} setPlanPeriodShort={setPlanPeriodShort}/>}
        {pages[2].status && <ThirdPage user={user} setUser={setUser} planPeriodShort={planPeriodShort} />}
        {pages[3].status && <ForthPage user={user} confirm={confirm} setConfirm={setConfirm} setPages={setPages} planPeriodShort={planPeriodShort}/>} 

        {!confirm && (
          <div className='bottom-div'>
          {showBackBtn  && <button className='btn back-btn' onClick={goBack}>Go Back</button>}
          {showConfirmBtn && <button className='btn confirm-btn' onClick={confirming}>Confirm</button>}
          {showNextBtn && <button className='btn next-btn' onClick={goNextPage}>Next Step</button>}
        </div>)}
      </div>
    </main>
  );
}

export default App;
