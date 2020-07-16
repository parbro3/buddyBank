
//handler, service, request, response in java
//but in js functional programming it should be just simple
import React, {useState} from 'react';
import { API } from 'aws-amplify';

/*
export default getMessageCount = () => {
    console.log('getMessageCount called');
    return apiRequest('/buddyBank','/message/deposit',{});
}

export default withdrawMessage = () => {
    console.log('withdrawMessage called');
    return apiRequest('/buddyBank','/message/deposit',{});
}

export default depositMessage = () => {
    console.log('depositMessage called');
    return apiRequest('/buddyBank','/message/withdraw',{});
}

export class MessageApi extends React.Component {
    render() {
        return apiRequest('/buddyBank','/message/withdraw',{});
    }
}
*/

class DepositMessage extends React.Component) {

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
    }


    console.log('depositMessage called');

    const cb = (response) => {
        console.log('this is a test callback');
        console.log(response);
        console.log('props value passed in : ')
        console.log(props.testParam)

        props.handlerFunction()

        return(null)
    }
    const error = (error) => {
        console.log('this is a test error');
        console.log(error);
        return(null)
    }
    return apiRequest('buddyBank','/message/withdraw',{}, cb, error);
}


//TODO: add the response and error functions into the params of the request
const apiRequest = (apiName, path, init, cb, error) => {
    console.log('apiRequest called');

    var asdf = "fdsa"

    API.get(apiName, path, init).then(cb).catch(error);

    return(
        <div>
            here is a test return apiRequest
        </div>
    )
    /*
    .then(response => {
      // Add your code here
      console.log('here is the response ' + JSON.stringify(response));
      return response
    })
    .catch(error => {
      console.log('yooooo error bro ' + error.response);
  });
  */

}
