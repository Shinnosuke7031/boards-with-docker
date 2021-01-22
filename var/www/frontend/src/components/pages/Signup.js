import React, { useContext, useEffect } from 'react';
import { SiteContext } from '../Routers';
import styles from './index.module.css';

const Signup = () => {
  const { state, dispatch } = useContext(SiteContext);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 'Signup'
    })
  }, []);

  return (
    <div className={styles.container}>
      
      <p>This is Signup page.</p>

    </div>
  );
}

export default Signup;