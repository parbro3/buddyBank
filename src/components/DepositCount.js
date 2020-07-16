import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { API, Auth } from 'aws-amplify';

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
    const [countState, setCountState] = useState("");





  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
            <Typography component="h1" variant="h5">
            {displayMessage}
            and
            {countState}
            </Typography>

          <Grid container spacing={2} justify="center" wrap gutterBottom>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={6}>
                <Button className={classes.submit} variant="contained" color="primary" onClick={() => getMessageCount()}>
                    Subscribe
                </Button>
            </Grid>
          </Grid>



      </div>
    </Container>
  );
}
