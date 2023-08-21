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
          startDate: new Date("Sun Aug 20 07:12:31 +0000 2023"), //startDate -1
          endDate: new Date("Tue Aug 22 01:26:23 +0000 2023"), //endDate +1
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
