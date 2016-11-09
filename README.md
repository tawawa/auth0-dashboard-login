### Auth0 SAAS Login Script
 
 Programmatic way to automate Dashboard login for Auth0.
 
 Rename `env.sample` to `.env` and populate the values. 
 
 Example of how it might look:

 ```
 SAAS_URL=https://config.auth0.com/
 CONNECTION=Dashboard-Users
 USERNAME=richard.seldon@auth0.com
 PASSWORD=
 CLIENT_ID=aCbTiadfasdfasdfOrSj2C
 REDIRECT_URI=https://manage.auth0.com/callback
 TENANT=mytenant
 ```

 Then run `npm i`
 
 Finally, run `node login.js`

 The Dashboard should open automatically in your default web browser window