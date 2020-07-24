import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import MessageApi from './api/MessageApi.js';
import DepositMessage from './components/DepositMessage.js'
import CountMessages from './components/CountMessages.js'

//Add amplify stuff... import and apply config
// import { API, Auth } from 'aws-amplify';

function Home() {

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

	return(
        <div>
            <DepositMessage caption='Type out something you think would be nice for someone to hear!' />

            <CountMessages />

            <p>
            <code>{responseState}</code>
            </p>
            <Button variant="contained" color="primary" onClick={() => handleClick()}>
            GetMessage
            </Button>
        </div>
    );
    
}
export default Home;


