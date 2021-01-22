import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '../UIparts/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SiteContext } from '../Routers';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Haeader = () => {
  const classes = useStyles();
  const {state, dispatch} = useContext(SiteContext);

  const handleClick = () => {
    dispatch({
      type: 'CHANGE_ISLOGIN',
      payload: false
    })
    console.log(state)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to='/' style={{textDecoration: "none", color: "white"}}>簡易掲示板</Link>
          </Typography>
          {state.page === 'Board' ? 
            <Button isLink={true} to={'/'} label='ログアウト' variant="text" color="inherit" onClick={handleClick} /> : 
            // <Button isLink={true} to={'/'} label='ログアウト' variant="text" color="inherit" />: 
            <Button isLink={true} to={'/'} label='ログイン' variant="text" color="inherit" />
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Haeader;




