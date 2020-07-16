import { API } from 'aws-amplify';

//this is automatically being called.
//Can I do it with a button too?
//Maybe have an auto option and a button option?
export default function MessageApi(props) {
    return apiRequest('buddyBank',props.endpoint,{}, props.cb, props.error);
}

//TODO: add the response and error functions into the params of the request
const apiRequest = (apiName, path, init, cb, error) => {
    console.log('apiRequest called')
    API.get(apiName, path, init).then(cb).catch(error);
    return(null)
}