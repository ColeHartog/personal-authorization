# personal-authorization

Personal template for server and local authorization using mongoose, bcrypt-nodejs, and jsonwebtokens.

# Set Up
Login is for a pre-existing user,
Register is to make a new user,
and loggedin is to see if the current user token information is valid.

Store the loginToken you get back from either a login or register and store that in your local storage.

Then whenever you make a request just add

headers : {
    loginToken: token
}

to your $http request with token being the token you have stored in your localStorage.