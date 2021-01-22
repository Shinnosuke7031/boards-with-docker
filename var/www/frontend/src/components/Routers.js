import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';

import Header from './organisms/Header';
import Top from './pages/Top';
import Board from './pages/Board';
import styles from './index.module.css';

const initState = {
  isLogin: false,
}

const SiteProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <SiteContext.Provider value={{state, dispatch}}>
    {children}
  </SiteContext.Provider>
}

const Routers = () => {
  return(
    <SiteProvider>
      <Router>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route exact path={'/'} component={Top} />
            <Route exact path={'/boards'} component={Board} />
          </Switch>
        </div>
      </Router>
    </SiteProvider>
)};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ISLOGIN':
      return {
        ...state,
        isLogin: action.payload,
      }
    
    default:
      return state;
  }
}

export const SiteContext = createContext();

export default Routers;