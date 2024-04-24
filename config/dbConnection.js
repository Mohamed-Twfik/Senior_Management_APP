import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnection = (app, port) => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected successfully to server");
      const listenon = process.env.PORT || port;
      app.listen(listenon, () =>
        console.log(`app listening on port ${listenon}!`)
      );
    })
    .catch((err) => console.log(err));
};

export { dbConnection };
