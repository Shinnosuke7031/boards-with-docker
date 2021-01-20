import React, { useEffect } from 'react';
import axios from 'axios';

const headers = {
  "Content-type": "application/json",
}
const urlApi = 'http://localhost:8080/api/v1/';
const time = new Date().toLocaleString();

const testPosts = {
  user_id: 'test1234', 
  name: 'test man', 
  comment: 'This is test.', 
  isFile: false, 
  time: time.replace(/\//g, '-'), 
  fname: 'none', 
  extension: 'none', 
  raw_data: 'none' 
}

const Test = (props) => {

  useEffect(() => {
    console.log(time.replace(/\//g, '-'))
    
    axios.post(urlApi + 'store', testPosts, {headers})
    .then(res => console.log(res))
    .catch(err => console.error(err));

    // axios.get(urlApi + 'boards', {headers})
    // .then(res => console.log(res))
    // .catch(err => console.error(err));
  },[])

  return (
    <p>This is {props.test}</p>
  );
}

export default Test;