import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const pButton = (props) => {
  
  const defaultFunc = () => {};
  const onClick = props.onClick === undefined ? defaultFunc : props.onClick;

  return (
    <React.Fragment>
      {props.isLink ? 
        <Button variant={props.variant} color={props.color} onClick={()=>onClick()}>
          <Link to={props.to} style={{textDecoration: "none", color: "white"}}>{props.label}</Link>
        </Button> :
        <Button variant={props.variant} color={props.color} onClick={()=>props.onClick()} >
          {props.label}
        </Button>
      }
    </React.Fragment>
  );

}

export default pButton;