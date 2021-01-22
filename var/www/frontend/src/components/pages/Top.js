import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SiteContext } from '../Routers';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Top = () => {
  const { state, dispatch } = useContext(SiteContext);

  console.log(state);

  return (
    <div className={styles.container}>
      
      <form className={styles.login_form} noValidate autoComplete="off">
        <TextField id="standard-required" label="ID" />
        <TextField
          id="standard-password-input"
          label="パスワード"
          type="password"
          autoComplete="current-password"
          />
        <div className={styles.login_btn}>
        <Button variant="contained" color="primary">
          <Link to={'boards'}>ログイン</Link>
        </Button>
        </div>
      </form>

    </div>
  );
}

export default Top;