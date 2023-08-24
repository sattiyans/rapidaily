const { Auth } = require("rettiwt-auth");
const { Rettiwt } = require("rettiwt-api");
require("dotenv").config();

new Auth()
  .getUserCredential({
    email: process.env.SECRET_EMAIL,
    userName: process.env.SECRET_USERNAME,
    password: process.env.SECRET_PASSWORD,
  })
  .then((credential) => {
    // console.log(credential);

    // Creating a new Rettiwt instance using the cookies
    const rettiwt = new Rettiwt(credential.cookies);

    rettiwt.tweet
      .search(
        {
          fromUsers: ["askrapidkl"],
          words: ["kesulitan", "maaf"],
          startDate: new Date(Date.now() - 86400000),
          endDate: new Date(),
        }
        // 10
      )
      .then((data) => {
        // console.log(data.list.map((tweet) => tweet.createdAt));
        console.log(data);
      })
      .catch((err) => {
        console.log("No data found");
        console.log(err);
      });
  });
