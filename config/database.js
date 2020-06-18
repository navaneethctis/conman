const config = require('config');
const mongoose = require('mongoose');

const connectionString = config.get('connectionString');

const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to database.');
  } catch (error) {
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDatabase;
