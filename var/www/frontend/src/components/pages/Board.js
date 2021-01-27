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
  const [data, setData] = useState([]);
  const [delNumber, setDelNumber] = useState(0);
  const [editNumber, setEditNumber] = useState(0);
  const [editText, setEditText] = useState('');

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
    // .then(res => console.log(res))
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

  const deleteID = () => {

    const del_id = data.filter((el, index) => {
      return Number(delNumber) === index+1
    });

    if (del_id[0].user_id === state.id) {

      axios.post(urlBase + `delete/${del_id[0].id}`)
      // .then(res => console.log(res))
      .catch(err => console.error(err));
      
      setTimeout(()=>{// 少し時間置かないと更新されない
        axios.get(urlBase + 'boards')
          .then(res => setData(res.data))
          .catch(err => {
            setData([]);
            console.error(err);
          })
      }, 2000)

      alert('コメントを削除しました');

    } else {
      alert('このコメントは削除できません');
    }

    setDelNumber('');

  }

  const editID = () => {
    const time = new Date().toLocaleString();
    const edit_id = data.filter((el, index) => {
      return Number(editNumber) === index+1;
    });

    const editData = {
      id: edit_id,
      comment: editText,
      time: time.replace(/\//g, '-'), 
    };
    
    if (edit_id[0].user_id === state.id) {

      axios.post(urlBase + 'update', editData)
        .then(res => console.log(res))
        .catch(err => console.error(err));
      
      setTimeout(()=>{// 少し時間置かないと更新されない
        axios.get(urlBase + 'boards')
          .then(res => setData(res.data))
          .catch(err => {
            setData([]);
            console.error(err);
          })
      }, 2000)

      alert('コメントを編集しました.');

    } else {
      alert('このコメントは編集できません');
    }

    setEditNumber('');
    setEditText('');
  }

  const updateData = () => {
    axios.get(urlBase + 'boards')
      .then(res => setData(res.data))
      .catch(err => {
        setData([]);
        console.error(err);
      })
  }

  return (
    state.isLogin ?
    <div className={`${styles.container} ${styles.container_board}`}>
      
      <h1 className={styles.title}>掲示板</h1>

      <form className={styles.login_form} noValidate autoComplete="off">
        <div className={styles.text_and_btn}>
          <TextField 
            id="standard-required" 
            label="投稿内容" 
            value={inputText}
            onChange={event=>setInputText(event.target.value)}
          />
          <div className={styles.store_btn}>
            {isEdit ?
              <Button isLink={false} label='更新' variant="contained" color="primary" onClick={()=>storeToBoard()} /> :
              <Button isLink={false} label='投稿' variant="contained" color="primary" onClick={()=>storeToBoard()} />
            }
          </div>
        </div>
        <div className={styles.text_and_btn}>
          <TextField
            id="standard-number"
            label="コメント番号"
            type="number"
            onChange={event=>setDelNumber(event.target.value)}
          />
          <div className={styles.store_btn}>
            <Button isLink={false} label='削除' variant="contained" color="primary" onClick={()=>deleteID()} />  
          </div>
        </div>
      </form>

      <br />

      <div className={styles.text_and_btn}>
        {isEdit ?
          <Button isLink={false} label='編集をやめる' variant="contained" color="primary" onClick={()=>handleEditMode()} /> :
          <Button isLink={false} label='編集する' variant="contained" color="primary" onClick={()=>handleEditMode()} />
        }
        <p style={{width: '20px'}}></p>
        <Button isLink={false} label='更新' variant="contained" color="primary" onClick={()=>updateData()} />
      </div>

      <div className={styles.text_and_btn}>
        <TextField
          label="コメント番号"
          type="number"
          value={editNumber}
          onChange={event=>setEditNumber(event.target.value)}
        />
        <p style={{width: '20px'}}></p>
        <TextField 
          label="編集内容" 
          value={editText}
          onChange={event=>setEditText(event.target.value)}
        />
        <p style={{width: '20px'}}></p>
        <Button isLink={false} label='編集する' variant="contained" color="primary" onClick={()=>editID()} />
      </div>

      <BoardData data={data} />
    </div> :
    <div className={`${styles.container}`}>
      <Link to='/'>こちら</Link>からログインしてください
    </div>
  );
};

export default Board;