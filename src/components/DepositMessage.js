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
export default function DepositMessage(props) {

    const [responseState, setResponseState] = useState("no response yet");
    const [messageState, setMessageState] = useState("no response yet");

    const cb = (response) => {
        setResponseState(response.message)
    }
    const error = (error) => {
        setResponseState(error.message)
    }

    const handleClick = () => {
        const init = {
            body:{
                'message': messageState,
                'accountId': '0000'
            }
        }
        MessageApi({'endpoint':'/message/deposit', 'init':init, 'cb':cb,'error':error})
    }
    const handleTextFieldChange = (message) => {
        setMessageState(message)
    }


    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid>
                        <Grid item xs>
                            <Typography>{props.caption}</Typography>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                onChange={(event) => handleTextFieldChange(event.target.value)}
                                placeholder="Hey I don't know you, but I know you'll do great today!"
                                multiline
                                rows={4}
                                rowsMax={8}
                            />
                        </Grid>
                        <Button variant="contained" color="primary" onClick={() => handleClick()}>
                            Send Message
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )

}