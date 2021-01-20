import React, { useEffect } from 'react';

const test_api = 'http://localhost:8080/api/v1/users';

const Test = (props) => {

  useEffect(() => {
    fetch(test_api)
      .then(res => res.text())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  },[])

  return (
    <p>This is {props.test}</p>
  );
}

export default Test;