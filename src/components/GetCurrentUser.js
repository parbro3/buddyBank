import {Auth} from 'aws-amplify';

export default function getCurrentUser(cb, error) {
    console.log("inside getCurrentUser try");
    Auth.currentAuthenticatedUser()
    .then(user => {
        console.log(user);
        return user['username'];
      })
      .catch(error);
  }