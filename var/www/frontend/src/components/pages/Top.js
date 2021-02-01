import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../parts/Button';
import { SiteContext } from '../Routers';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const users_url = 'http://localhost:8080/api/v1/users';
const headers = {
  "Content-type": "application/json",
  responseType: 'json'  
}

const Top = () => {
  const { state, dispatch } = useContext(SiteContext);

  const [userID, setUserID] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 'Top'
    })

    dispatch({
      type: 'CHANGE_ISLOGIN',
      payload: false
    })
  }, []);

  

  const loginClick = () => {
    axios.get(users_url)
    .then(res => res.data)
    .then(data => {
      console.log(data)
      // console.log(login_check(data, userID, pass));
      return login_check(data, userID, pass);
    })
    .then(res => {

      if (res['isLogin']) {// パスワード一致
        dispatch({
          type: 'CHANGE_NAME',
          payload: res['name']
        })
        dispatch({
          type: 'CHANGE_ISLOGIN',
          payload: res['isLogin']
        })
      } else {// Alert Error
        setIsError(true);
      }
    })
    .catch(err => console.error(err));
  }

  return (
    <div className={styles.container}>
      
      <form className={styles.login_form} noValidate autoComplete="off">
      {/* <div className={styles.login_form}> */}
        <TextField 
          id="standard-required" 
          label="ID" 
          onChange={event=>{
            setUserID(event.target.value);
            dispatch({
              type: 'CHANGE_ID',
              payload: userID
            })
          }}/>
        <TextField
          id="standard-password-input"
          label="パスワード"
          type="password"
          autoComplete="current-password"
          onChange={event=>setPass(event.target.value)}
          />
        <div className={styles.login_btn}>
          <Button isLink={false} label='ログイン' variant="contained" color="primary" onClick={()=>loginClick()} />
          {/* <Button isLink={true} to={'/boards'} label='ログイン' variant="contained" color="primary" onClick={()=>loginClick()} /> */}
        </div>    
      {/* </div> */}
        {isError && <p className={styles.altError}>IDもしくはパスワードが間違っています</p>}
      </form>


      <p>新規登録は<Link to={'/signup'}>こちら</Link> </p>

    </div>
  );
}

export default Top;

const login_check = (data, id, pass) => {
  let isLogin = false;
  let name = '';
  data.forEach(el => {
    if (el.user_id === id) {
      isLogin = el.password === pass;
      name = el.name;
    }
  });
  return {isLogin: isLogin, name: name};
}