import React, { useContext, useEffect } from 'react';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ImgData from './ImgData';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    border: '1px solid #000000',
    marginBottom: '30px'
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  items: {
    display: 'flex'
  },
  id: {
    width: '10%'
  },
  name: {
    width: '20%'
  },
  comment: {
    width: '40%'
  },
  time: {
    width: '40%'
  },
}));

const fetcher = (...args) => fetch(...args).then(res => res.json());
const urlBase = 'http://localhost:8080/api/v1/';

const BoardData = (props) => {

  const classes = useStyles();
  const data = props.data;

  // const { data, error } = useSWR(urlBase + 'boards', fetcher);
  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  return (
    <List className={classes.root}>
      <ul className={classes.ul}>
        {data.map((el, index) => (
            el.isFile === 0 ?
            <ListItem key={index++}>
              <input value={el.id} type='hidden' />
              <ListItemText className={classes.id} primary={index} />
              <ListItemText className={classes.name} primary={el.name} />
              <ListItemText className={classes.comment} primary={el.comment} />
              <ListItemText className={classes.time} primary={el.time} />
            </ListItem> :
            <ListItem key={index++}>
              <input value={el.id} type='hidden' />
              <ListItemText className={classes.id} primary={index} />
              <ListItemText className={classes.name} primary={el.name} />
              {/* <ListItemText className={classes.comment} primary={el.comment} /> */}
              {el.extension === 'img' &&  <img src={el.fname} width="40%" />}
              {el.extension === 'video' &&  <video src={el.fname} width="40%" preload="none" autoPlay loop controls playsinline type="video/mp4" />}
              <ListItemText className={classes.time} primary={el.time} />
            </ListItem>
        ))}
      </ul>
    </List>
  );
}

export default BoardData;