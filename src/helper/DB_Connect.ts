import mongoose from "mongoose";

export async function DBconnect() {
    const Uri = process.env.MONGO_URI;
    try {
        if (!Uri) {
            throw new Error('MONGO_URI not found');
        }
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(Uri);
            console.log('Connected to MongoDB');
        }
        else if (mongoose.connection.readyState === 1) {
            console.log('Already connected to MongoDB');
        }
        else if (mongoose.connection.readyState === 2) {
            console.log('Connecting to MongoDB');
        }
        else if (mongoose.connection.readyState === 3) {
            console.log('Disconnecting from MongoDB');
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
            await mongoose.connect(Uri);
            console.log('Connected to MongoDB');
        }else {
            console.log('Unknown connection state to MongoDB');
        }
        mongoose.connection.on('error', (error) => {
            console.error(error);
        });
    } catch (error) {
        console.error(error);
    }
}

// The readyState property of the Mongoose connection object is an integer that represents the state of the connection.
// 0: disconnected – Mongoose is not connected to the database.
// 1: connected – Mongoose is connected and ready to interact with the database.
// 2: connecting – Mongoose is currently attempting to establish a connection.
// 3: disconnecting – Mongoose is in the process of disconnecting from the database.