import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
//import DepositCount from './components/DepositCount.js';
import MessageApi from './api/MessageApi.js';
import DepositMessage from './components/DepositMessage.js'

//add amplify ui components
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

//Add amplify stuff... import and apply config
import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import Button from '@material-ui/core/Button';
Amplify.configure(awsconfig);

function App() {

  const [responseState, setResponseState] = useState("no response yet");

  const callBack = (response) => {
    setResponseState(response.message)
  }
  const error = (error) => {
    setResponseState(error.message)
  }

  const handleClick = () => {
    //Wow. I legit can't believe this worked. Go me.
    MessageApi({'endpoint':'/message/withdraw', 'init':{}, 'cb':callBack,'error':error})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      {/* This is cool that this automatically gets called and populates the state variable */}
      {/* <MessageApi endpoint='/message/withdraw' cb={callBack} error={error}/> */}

      <div>

        <DepositMessage caption='Type out something you think would be nice for someone to hear!' />



        <p>
          <code>{responseState}</code>
        </p>
        <Button variant="contained" color="primary" onClick={() => handleClick()}>
          GetMessage
        </Button>
      </div>
      
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
