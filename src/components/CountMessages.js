import React, {useState} from 'react';
import MessageApi from '../api/MessageApi.js';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }));

//fully contained deposit message copmonent
export default function CountMessages(props) {

    const [responseState, setResponseState] = useState("no response yet");

    const cb = (response) => {
        setResponseState(response.messageCount);
    }
    const error = (error) => {
        setResponseState(error.message);
    }


    //this one should be automatic.. not a button click.
    const classes = useStyles();
    return(
        <div className={classes.root}>
            Bank Messages: {responseState}
            <MessageApi endpoint='/message/count' cb={cb} error={error}/>
        </div>
    )

}