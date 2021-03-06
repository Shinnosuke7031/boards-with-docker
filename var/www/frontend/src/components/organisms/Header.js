import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '../parts/Button';
import { SiteContext } from '../Routers';
import { Link } from 'react-router-dom';
import axios from 'axios';
const urlBase = 'http://ec2-54-250-181-91.ap-northeast-1.compute.amazonaws.com:8080/api/v1/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    position: 'absolute',
    top: '17px',
    left: '45%'
  },
  btn: {
    position: 'absolute',
    top: '17px',
    right: 0
  }
}));

const Haeader = () => {
  const classes = useStyles();
  const {state, dispatch} = useContext(SiteContext);

  useEffect(()=>{
    console.log(state)
  }, [state])

  const handleClick = () => {
    axios
      .post(urlBase + 'users/logout', [], {
        withCredentials: true
      })
      .then(res=>{
        console.log(res);
        dispatch({
          type: 'CHANGE_ISLOGIN',
          payload: false
        });
      })
      .catch(err=>console.error(err));

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {state.isLogin && <Typography variant="h10">ようこそ　{state.name} さん</Typography>}
          <Typography variant="h5" className={classes.title}>
            <Link to='/' style={{textDecoration: "none", color: "white"}}>簡易掲示板</Link>
          </Typography>
          <div className={classes.btn}>
            {state.isLogin ? 
              <Button isLink={true} to={'/'} label='ログアウト' variant="text" color="inherit" onClick={handleClick} /> : 
              // <Button isLink={true} to={'/'} label='ログアウト' variant="text" color="inherit" />: 
              <Button isLink={true} to={'/'} label='ログイン / 新規登録' variant="text" color="inherit" />
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Haeader;




