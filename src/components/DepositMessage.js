import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { API } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  emailField: {
    backgroundColor: 'transparent'
  }
}));

export default function DepositMessage() {
  const classes = useStyles();


    const [displayMessage, setDisplayMessage] = useState("");
    const [messageState, setMessageState] = useState("");

    const handleEmailChange = (email) => {
        setMessageState(email);
    }


    const checkInput = () => {
        if(!(messageState != "")){
            setDisplayMessage('Type out a message you want someone to see!')
            return false;
        } else if (messageState.length < 10) {
            setDisplayMessage('Maybe try putting a little more thought into it...')
            return false;
        }
        return true;
    }

  const addEmailToDB = () => {
    console.log('clicked yoooooo');


    //check input
    if(checkInput()){

        async function putData() { 
            const apiName = 'depositMessage';
            const path = '/message/deposit';
            const myInit = { // OPTIONAL
                body: {
                    'message':messageState
                }, // replace this with attributes you need
                headers: {}, // OPTIONAL
            };
        
            return await API.put(apiName, path, myInit);
        }
        
        putData();

    }

  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
            <Typography component="h1" variant="h5">
            {displayMessage}
            </Typography>

          <Grid container spacing={2} justify="center" wrap gutterBottom>
            <Grid item xs={6}>

                    <TextField
                        className={classes.emailField}
                        overlayStyle={{backgroundColor: 'primary'}}
                        variant="standard"
                        color = "primary"
                        required
                        fullWidth
                        name="password"
                        label="Email"
                        type="email"
                        id="password"
                        autoComplete="current-password" 
                        onChange={(event) => handleEmailChange(event.target.value)}
                    />

            </Grid>
            <Grid item xs={6}>
                <Button className={classes.submit} variant="contained" color="primary" onClick={() => addEmailToDB()}>
                    Subscribe
                </Button>
            </Grid>
          </Grid>



      </div>
    </Container>
  );
}
