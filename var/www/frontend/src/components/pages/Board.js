import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SiteContext } from '../Routers';
import styles from './index.module.css';

const Board = () => {
  const { state, dispatch } = useContext(SiteContext);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 'Board'
    })
  }, []);

  return (
    <div className={styles.container}>
      
      <p>This is Board page.</p>

    </div>
  );
}

export default Board;