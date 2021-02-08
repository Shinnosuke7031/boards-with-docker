import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import Header from './organisms/Header';
import Top from './pages/Top';
import Board from './pages/Board';
import styles from './index.module.css';
import Signup from './pages/Signup';
import SignupComplete from './pages/SinupComplete';


const Index = () => {
  const { state, dispatch } = useContext(SiteContext);
  return (
    <Route exact path={'/'} >
      {state.isLogin ? <Redirect to={'/boards'} /> : <Top />}
    </Route>
  )
}

const Routers = () => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 560px)'})
  return(
    <SiteProvider>
      <Router>
        <Header />
        <div className={isMobileScreen ? styles.container_mob : styles.container}>
          <Switch>
            <Route exact path={'/boards'} component={Board} />
            <Route exact path={'/signup'} component={Signup} />
            <Route exact path='/signup-complete' component={SignupComplete} />
              {/* <Route path={'/:token'} children /> */}
            <Index />
            {/* <Route exact path={'/'} component={Top} /> */}
          </Switch>
        </div>
      </Router>
    </SiteProvider>
  )
};

// ================== Context API =================== //
const initState = {
  isLogin: false,
  page: '',
  id: '',
  name: '',
}

const SiteProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <SiteContext.Provider value={{state, dispatch}}>
    {children}
  </SiteContext.Provider>
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ISLOGIN':
      return {
        ...state,
        isLogin: action.payload,
      }
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.payload,
      }
    case 'CHANGE_ID':
      return {
        ...state,
        id: action.payload,
      }
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.payload,
      }
    
    default:
      return state;
  }
}

export const SiteContext = createContext();

export default Routers;