import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SiteContext } from '../Routers';
import styles from './index.module.css';

const Top = () => {
  const { state, dispatch } = useContext(SiteContext);

  console.log(state);

  return (
    <div className={styles.container}>
      
      <p>This is Board page.</p>

    </div>
  );
}

export default Top;