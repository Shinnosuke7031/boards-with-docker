import React, { useContext, useEffect, useState } from 'react';
import { SiteContext } from '../Routers';
import BoardData from '../parts/BoardData';
import styles from './index.module.css';
import Button from '../parts/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase, { storage } from "../../../firebase/firebase";

const urlBase = 'http://localhost:8080/api/v1/';
const urlBase_v2 = 'http://localhost:8080/api/v2/';

const Board = () => {
  const { state, dispatch } = useContext(SiteContext);

  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [delNumber, setDelNumber] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: 'Board'
    })
    //------- jwt認証 --------//
    axios
    .post(urlBase_v2 + 'user', [], {
      withCredentials: true
    })
    .then(res=>{
      dispatch({
        type: 'CHANGE_NAME',
        payload: res.data['name']
      })
      dispatch({
        type: 'CHANGE_ID',
        payload: res.data['userID']
      })
      dispatch({
        type: 'CHANGE_ISLOGIN',
        payload: true
      })
    })
    .catch(err=>{
      dispatch({
        type: 'CHANGE_ISLOGIN',
        payload: false
      })
    });
    //------- 掲示板情報の取得 --------//
    axios
      .get(urlBase + 'boards')
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setData([]);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (imageUrl !== "") {
      const time = new Date().toLocaleString();
      let storeData = {
        user_id: state.id, 
        name: state.name, 
        comment: 'not text', 
        isFile: true, 
        time: time.replace(/\//g, '-'), 
        fname: imageUrl, 
        extension: 'img', 
        raw_data: 'none' 
      }
      if (image.type === 'video/mp4') {
        storeData['extension'] = 'video';
      }
      setImage("");
      axios.post(urlBase + 'store', storeData)
           .then(res=>{
             setImageUrl('');
           })
           .catch(err=>{
             setImageUrl('');
           })

      setTimeout(()=>{// 少し時間置かないと更新されない
        axios.get(urlBase + 'boards')
          .then(res => setData(res.data))
          .catch(err => {
            setData([]);
            console.error(err);
          })
      }, 2000)
    }
    
  }, [imageUrl])

  const storeToBoard = () => {
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

    console.log(delNumber)

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

  const handleChangeFile = (event) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  }

  const sendFile = () => {
    if (image === "") {
      console.log("ファイルが選択されていません");
    } else {

      // アップロード処理
      const uploadTask = storage.ref(`/images/${image.name}`).put(image);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );
    }
  }

  const next = snapshot => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };
  const error = error => {
    // エラーハンドリング
    console.log(error);
  };
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(fireBaseUrl => {
        setImageUrl(fireBaseUrl);
      });
  };

  return (
    <div className={`${styles.container} ${styles.container_board}`}>
      
      <h1 className={styles.title}>掲示板</h1>

      {/* 投稿と削除のフォーム */}
      {!isLoading && state.isLogin && <form className={styles.login_form} noValidate autoComplete="off">
        <div className={styles.text_and_btn}>
          <TextField 
            id="standard-required" 
            label="投稿内容" 
            value={inputText}
            onChange={event=>setInputText(event.target.value)}
          />
          <div className={styles.store_btn}>
            <Button isLink={false} label='投稿' variant="contained" color="primary" onClick={()=>storeToBoard()} />
          </div>
        </div>
        <div className={styles.text_and_btn}>
          <TextField
            id="standard-number"
            label="コメント番号"
            type="number"
            value={delNumber}
            onChange={event=>setDelNumber(event.target.value)}
          />
          <div className={styles.store_btn}>
            <Button isLink={false} label='削除' variant="contained" color="primary" onClick={()=>deleteID()} />  
          </div>
        </div>
      </form>}

      <br />

      {/* 編集のフォーム */}
      {!isLoading && state.isLogin && <div className={styles.text_and_btn}>
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
      </div>}

      {/* 掲示板の更新ボタン */}
      {!isLoading && state.isLogin && <div className={styles.text_and_btn}>
        <Button isLink={false} label='更新' variant="contained" color="primary" onClick={()=>updateData()} />
      </div>}

      {/* 画像・動画のフォーム */}
      {!isLoading && state.isLogin && <div>
        <input type='file' accept="image/*, video/mp4" onChange={handleChangeFile} />
        <Button isLink={false} label='アップロード' variant="contained" color="primary" onClick={()=>sendFile()} />
      </div>}

      {/* 掲示板 */}
      {!isLoading && state.isLogin && <BoardData data={data} />}

      {!isLoading && !state.isLogin && <div className={`${styles.container}`}>
        <Link to='/'>こちら</Link>からログインしてください
      </div>}
      {isLoading && <div className={styles.loader}></div>}
    </div>
  );
};

export default Board;