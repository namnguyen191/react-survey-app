//INIT .env
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

export default () => {
    const dbURI = process.env.MONGODB_CONNECTION_STRING;
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection is open to ', mongoose.connection.host, ': ', mongoose.connection.name);
    });

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection has occured ', err, ' error');
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection is disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(
                'Mongoose default connection is disconnected due to application termination'
            );
            process.exit(0);
        });
    });
};
