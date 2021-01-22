import React, { useContext } from 'react';
import { SiteContext } from './Routers';
import { Redirect } from 'react-router-dom';

const Auth = () => {
  const { state, dispatch } = useContext(SiteContext);
  return (state.isLogin ? props.children : <Redirect to={'/'}/>);
}

export default Auth;