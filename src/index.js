import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from '@auth0/auth0-react';


const domain =  process.env.REACT_APP_AUTH0_DOMAIN
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID
const audience = process.env.REACT_APP_AUTH0_AUDIENCE
const scope = process.env.REACT_APP_AUTH0_SCOPE

console.log(scope, audience);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
      domain={domain} 
      clientId={client_id} 
      redirectUri={window.location.origin}
      audience={audience}
      scope={scope}>
      <App/>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
