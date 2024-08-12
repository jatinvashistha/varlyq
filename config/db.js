const mongoose = require('mongoose');
const databaseConnection = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("mongoodb is connected");
      })
      .catch((e) => console.log("The error in mongodb connection is", e));
}

module.exports = {databaseConnection}
