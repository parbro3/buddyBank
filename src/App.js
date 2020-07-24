import React from 'react';
//import './App.css';
//import DepositCount from './components/DepositCount.js';

import Header from './Header.js'
import Home from './Home.js'

//add amplify ui components
import Amplify from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" /> */}
        <Header />
      </header>

      <div className="Main">
        <Home />
        <AmplifySignOut/>
      </div>
      
    </div>
  );

}
export default withAuthenticator(App);
