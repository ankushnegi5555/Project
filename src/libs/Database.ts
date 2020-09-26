import * as mongoose from 'mongoose';
import seedData from './seedData';

export default class Database {
  static open = (mongoURL: string) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(
          mongoURL,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          },
          err => {
            if (err) {
              console.log('Error in connection with mongooseDB');
              reject();
            } else {
              seedData();
              console.log('Successful connection with mongooseDB');
              resolve();
            }
          }
        );
    });
  };
  static disconnect = () => {
    mongoose.connection.close();
    console.log('Database Disconnected');
  };
}
