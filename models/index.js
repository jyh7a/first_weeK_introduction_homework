const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = () => {
  if (process.env.NODE_ENV === "production") {
    mongoose.connect(process.env.MONGODB_PRODUCTION_URL).catch((err) => console.log(err));
  } else if (process.env.NODE_ENV === "development") {
    mongoose.connect(process.env.MONGODB_DEVELOP_URL).catch((err) => console.log(err));
  }
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
