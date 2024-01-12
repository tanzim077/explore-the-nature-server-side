require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const config = {
  production: process.env.MONGODB_URL,
  development: process.env.MONGODB_URL || process.env.MONGODB_URL_LOCAL,
  test: process.env.MONGODB_URL_TEST,
};

class DbConnection {
  static async connect () {
      try {
          await mongoose.connect(config[process.env.NODE_ENV]);
            console.log(`🚀🚀🚀🚀 { 🏗️ ${process.env.NODE_ENV} 🏗️ } Connected to MongoDB  🚀🚀🚀🚀`);
      } catch (error) {
          console.log(`❌❌❌ { 🏗️ ${process.env.NODE_ENV} 🏗️ } MongoDB Connection Error ❌❌❌`);
      }
  }
}

module.exports = DbConnection;
