import { API } from 'aws-amplify';

/*

Call automatically.. pass in the state variable in the defined callback
<MessageApi endpoint='/message/withdraw' cb={callBack} error={error}/>

Or call on button click
const handleClick = () => {
    MessageApi({'endpoint':'/message/withdraw', 'cb':callBack,'error':error})
}

*/

export default function MessageApi(props) {
    return apiRequest('buddyBank',props.endpoint,{}, props.cb, props.error);
}

//TODO: add the response and error functions into the params of the request
const apiRequest = (apiName, path, init, cb, error) => {
    console.log('apiRequest called')
    API.get(apiName, path, init).then(cb).catch(error);
    return(null)
}