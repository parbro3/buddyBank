import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
//import DepositCount from './components/DepositCount.js';
import MessageApi from './api/MessageApi.js';

//add amplify ui components
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

//Add amplify stuff... import and apply config
import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {

  const [responseState, setResponseState] = useState("no response yet");

  var testVar = 'qwerqwer'

  const callBack = (response) => {

    console.log('here is the response' + JSON.stringify(response))
    setResponseState(response.message)

  }

  /*
  const handler = (newValue) => {
    setResponseState({
      someVar: newValue
    })
  }
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <MessageApi cb={callBack}/>

      <div>
        And here is the changed variable {responseState}
      </div>


      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
