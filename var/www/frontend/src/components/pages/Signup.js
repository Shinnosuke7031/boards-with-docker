import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../parts/Button';
import { SiteContext } from '../Routers';
import styles from './index.module.css';
import axios from 'axios';

const urlBase = 'http://localhost:8080/api/v1/';

const Signup = () => {
  const { state, dispatch } = useContext(SiteContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [passRe, setRePass] = useState('');
  const [isError, setIsError] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 'Signup'
    })
  }, []);

  const signupClick = () => {
    if (email === '' || pass === '' || passRe === '' || pass !== passRe) {
      setIsError(true);
    } else {
      const time = new Date().toLocaleString();
      console.log("koko");
      setIsBtnClicked(true);

      const userInfo = {
        name: name,
        password: pass,
        email: email
      };

      axios.post(urlBase + 'users/new', userInfo)
           .then(res => console.log(res))
           .catch(err => console.error(err));

      

      // console.log(userInfo);

    }

  }

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  }

  const handleChangePass = event => {
    setPass(event.target.value);
  }

  const handleChangePassRe = event => {
    setRePass(event.target.value);
  }

  return (
    <div className={`${styles.container} ${styles.container_board}`}>
      
      <h1 className={styles.title}>新規登録</h1>

      <form className={styles.login_form} noValidate autoComplete="off">
      {/* <div className={styles.login_form}> */}
        <TextField 
          id="standard-required" 
          label="メールアドレス" 
          type='email'
          onChange={handleChangeEmail}
        />
        <TextField 
          id="standard-name-required" 
          label="名前" 
          type='text'
          onChange={event=>setName(event.target.value)}
        />
        <TextField
          id="standard-password-input"
          label="パスワード"
          type="password"
          autoComplete="current-password"
          onChange={handleChangePass}
        />
        <TextField
          id="standard-password-input"
          label="パスワード（確認）"
          type="password"
          autoComplete="current-password"
          onChange={handleChangePassRe}
          />
        <div className={styles.login_btn}>
          <Button isLink={false} label='登録する' variant="contained" color="primary" onClick={()=>signupClick()} />
          {/* <Button isLink={true} to={'/boards'} label='ログイン' variant="contained" color="primary" onClick={()=>loginClick()} /> */}
        </div>    
      {/* </div> */}
        {isError && <p className={styles.altError}>メールアドレスとパスワードは正しく入力して下さい</p>}
      </form>

    </div>
  );
}

export default Signup;