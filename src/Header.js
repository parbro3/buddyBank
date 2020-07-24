import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';

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

export default function ButtonAppBar() {
  const classes = useStyles();

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
						<Button size="large" href="/" color="primary">Social Hire</Button>
					</Typography>

					<Hidden xsDown>
						<MenuItem>
							<Button href="/process" color="primary">The Process</Button>
						</MenuItem>
						<Button href="/signup" color="primary">Sign Up</Button>
					</Hidden>

				</Toolbar>
			</AppBar>
		</div>

	</div>
  );
}
