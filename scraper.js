const { Auth } = require("rettiwt-auth");
const { Rettiwt } = require("rettiwt-api");
require("dotenv").config();

// console.log(process.env);
const userEmail = process.env.SECRET_EMAIL;
const userUserName = process.env.SECRET_USERNAME;
const userPassword = process.env.SECRET_PASSWORD;

new Auth()
  .getUserCredential({
    email: userEmail,
    userName: userUserName,
    password: userPassword,
  })
  .then((credential) => {
    console.log(credential);

    // Creating a new Rettiwt instance using the cookies
    const rettiwt = new Rettiwt(credential.cookies);

    // Fetching the details of the user whose username is <username>
    rettiwt.user
      .details("nrmnqdds")
      .then((details) => {
        console.log(details);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
    console.log(userEmail, userUserName, userPassword);
  });
