import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { SiteContext } from '../Routers';
import styles from './index.module.css';
import axios from 'axios';

const urlBase = 'http://localhost:8080/api/v1/';

const SignupComplete = (props) => {
  const { state, dispatch } = useContext(SiteContext);
  const [ userInfo, setUserInfo ] = useState({
    userID: '',
    name: '',
    pass: '',
  });
  const [ isRegister, setIsRegister ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  const location = useLocation();
  const token = location.search.slice(7);

  useEffect(() => {
    const postData = {
      token: token,
    }

    axios
      .post(urlBase + 'users/new/check', postData)
      .then(res=>res.data)
      .then(res=>{
        console.log(res)
        if (res.status === 'OK') {
          setUserInfo({
            userID: res.data.user_id,
            name: res.data.name,
            pass: res.data.password,
          });
          setIsRegister(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(err=>{
        console.error(err);
        setIsLoading(false);
      });
    
  }, [])

  return (
    <div className={`${styles.container} ${styles.container_board}`}>
      {isLoading && <p>処理中．．．</p>}
      {!isLoading && isRegister && <h1 className={styles.title}>登録が完了しました</h1>}
      <br />
      {!isLoading && isRegister &&
        <div className={styles.login_form}>
          <div className={`${styles.login_input} ${styles.user_info}`}>
            <p>ようこそ{userInfo.name}さん</p>
            <p>以下のユーザー情報は大切に保管しておいてください</p>
          </div>
          <div className={`${styles.login_input} ${styles.user_info}`}>
            <p><span style={{fontWeight: 'bold'}}>ユーザーID</span> : <span style={{fontWeight: 'bold'}}>{userInfo.userID}</span></p>
          </div>
          <div className={`${styles.login_input} ${styles.user_info}`}>
            <p><span style={{fontWeight: 'bold'}}>パスワード</span> : <span style={{fontWeight: 'bold'}}>{userInfo.pass}</span></p>
          </div>
          <p className={`${styles.login_input} ${styles.user_info}`}>ログインは<Link to='/'>こちら</Link></p>
        </div>
      }
      {!isLoading && !isRegister && <p>エラーが発生しました</p>}
      

    </div>
  );
}

export default SignupComplete;