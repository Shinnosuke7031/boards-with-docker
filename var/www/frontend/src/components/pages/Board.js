import React, { useContext, useEffect, useState } from 'react';
import { SiteContext } from '../Routers';
import BoardData from '../parts/BoardData';
import styles from './index.module.css';
import Button from '../parts/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

const urlBase = 'http://localhost:8080/api/v1/';

const Board = () => {
  const { state, dispatch } = useContext(SiteContext);

  const [inputText, setInputText] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 'Board'
    })

    axios.get(urlBase + 'boards')
      .then(res => setData(res.data))
      .catch(err => {
        setData([]);
        console.error(err);
      })
  }, []);

  const handleEditMode = () => {
    setIsEdit(!isEdit);
  }

  const storeToBoard = () => {
    // alert(`Your inputed text is ${inputText}, isEdit is ${isEdit}.`);
    const time = new Date().toLocaleString();
    const storeData = {
      user_id: state.id, 
      name: state.name, 
      comment: inputText, 
      isFile: false, 
      time: time.replace(/\//g, '-'), 
      fname: 'none', 
      extension: 'none', 
      raw_data: 'none' 
    }

    axios.post(urlBase + 'store', storeData)
    .then(res => console.log(res))
    .catch(err => console.error(err));

    setInputText('');

    setTimeout(()=>{// 少し時間置かないと更新されない
      axios.get(urlBase + 'boards')
        .then(res => setData(res.data))
        .catch(err => {
          setData([]);
          console.error(err);
        })
    }, 2000)


  }

  return (
    state.isLogin ?
    <div className={`${styles.container} ${styles.container_board}`}>
      
      <h1 className={styles.title}>掲示板</h1>

      <form className={styles.login_form} noValidate autoComplete="off">
        <TextField 
          id="standard-required" 
          label="投稿内容" 
          value={inputText}
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

      <BoardData data={data} />

    </div> :
    <div className={`${styles.container}`}>
      <Link to='/'>こちら</Link>からログインしてください
    </div>
  );
};

export default Board;