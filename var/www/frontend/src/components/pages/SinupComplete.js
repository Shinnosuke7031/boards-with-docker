import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '../parts/Button';
import { SiteContext } from '../Routers';
import styles from './index.module.css';
import axios from 'axios';

const urlBase = 'http://localhost:8080/api/v1/';

const SignupComplete = (props) => {
  const { state, dispatch } = useContext(SiteContext);
  const location = useLocation();
  const token = location.search.slice(7);
  console.log(token);

  return (
    <div className={`${styles.container} ${styles.container_board}`}>
      
      <h1 className={styles.title}>登録が完了しました</h1>
      {/* <p>Token is {token}.</p> */}

    </div>
  );
}

export default SignupComplete;