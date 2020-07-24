import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';

import getCurrentUser from './components/GetCurrentUser.js'
import {Auth} from 'aws-amplify';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
    const classes = useStyles();

    const [currentUserState, setCurrentUserState] = useState("no user yet");

    // maybe think about using await or something. 
    //also maybe you can do something like setCurrentUserState( await getCurrentUser()) or idk


    Auth.currentAuthenticatedUser()
    .then(user => {
      setCurrentUserState((user['username']));
    })
    .catch(ex => {
      console.log(ex);
    });




  return (
	<div className="HolyGrail-header">
		<div className={classes.root}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					{/*
						<MenuItem>
							<IconButton aria-label="show 4 new mails" color="inherit">
								<img width="45px" src={process.env.PUBLIC_URL + '/shlogo.png'} alt="logo" />
							</IconButton>
						</MenuItem>
					*/}

					<Typography variant="h6" className={classes.title}>
						<Button size="large" href="/" color="primary">Buddy Bank</Button>
					</Typography>

					{/* This is where the user's name is displayed */}

                    <Typography variant="h3" >
                        <Button size="large" href="/" color="primary">{currentUserState}</Button>
                    </Typography>


				</Toolbar>
			</AppBar>
		</div>

	</div>
  );
}
