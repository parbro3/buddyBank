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
    return apiRequest('buddyBank',props.endpoint,props.init, props.cb, props.error);
}

const apiRequest = (apiName, path, init, cb, error) => {
    console.log('here is the path: ' )
    console.log(path)
    switch(path){
        case '/message/deposit':
            API.post(apiName, path, init).then(cb).catch(error);
            break;
        default:
            API.get(apiName, path, init).then(cb).catch(error);
    }
    return(null)
}