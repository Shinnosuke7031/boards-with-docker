import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Switch, Route, HashRouter as Router, Redirect } from 'react-router-dom';

import Header from './organisms/Header';
import Auth from './Auth';
import Top from './pages/Top';
import Board from './pages/Board';
import styles from './index.module.css';
import Signup from './pages/Signup';


const Index = () => {
  const { state, dispatch } = useContext(SiteContext);
  return (
    <Route exact path={'/'} >
      {state.isLogin ? <Redirect to={'/boards'} /> : <Top />}
    </Route>
  )
}

const Routers = () => {
  return(
    <SiteProvider>
      <Router>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route exact path={'/boards'} component={Board} />
            <Index />
            {/* <Route exact path={'/'} component={Top} /> */}
            <Route exact path={'/signup'} component={Signup} />
          </Switch>
        </div>
      </Router>
    </SiteProvider>
)};

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