import React, { useContext, useEffect, useState } from 'react';
import { SiteContext } from '../Routers';
import BoardData from '../parts/BoardData';
import styles from './index.module.css';
import Button from '../parts/Button';
import TextField from '@material-ui/core/TextField';

const Board = () => {
  const { state, dispatch } = useContext(SiteContext);

  const [inputText, setInputText] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 'Board'
    })
  }, []);

  const handleEditMode = () => {
    setIsEdit(!isEdit);
  }

  const storeToBoard = () => {
    alert(`Your inputed text is ${inputText}, isEdit is ${isEdit}.`)
  }

  return (
    <div className={`${styles.container} ${styles.container_board}`}>
      
      <h1 className={styles.title}>掲示板</h1>

      <form className={styles.login_form} noValidate autoComplete="off">
        <TextField 
          id="standard-required" 
          label="投稿内容" 
          onChange={event=>setInputText(event.target.value)
          }/>
        <div className={styles.store_btn}>
          {isEdit ?
            <Button isLink={false} label='更新' variant="contained" color="primary" onClick={()=>storeToBoard()} /> :
            <Button isLink={false} label='投稿' variant="contained" color="primary" onClick={()=>storeToBoard()} />
          }
        </div> 
      </form>

      <br />

      {isEdit ?
        <Button isLink={false} label='編集をやめる' variant="contained" color="primary" onClick={()=>handleEditMode()} /> :
        <Button isLink={false} label='編集する' variant="contained" color="primary" onClick={()=>handleEditMode()} />
      }      

      <BoardData />

    </div>
  );
}

export default Board;