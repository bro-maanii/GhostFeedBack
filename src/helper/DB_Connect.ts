import mongoose from "mongoose";

export async function DBconnect() {
    const Uri = process.env.URI;  // Ensure URI is set in environment variables
    try {
        if (!Uri) {
            throw new Error('MONGO_URI not found'); // Ensure URI exists
        }

        switch (mongoose.connection.readyState) {
            case 0:
                console.log('Disconnected from MongoDB. Connecting...');
                await mongoose.connect(Uri);
                console.log('Connected to MongoDB');
                break;
            case 1:
                console.log('Already connected to MongoDB');
                break;
            case 2:
                console.log('Currently connecting to MongoDB');
                break;
            case 3:
                console.log('Disconnecting from MongoDB');
                await mongoose.disconnect();
                console.log('Disconnected from MongoDB. Reconnecting...');
                await mongoose.connect(Uri);
                console.log('Reconnected to MongoDB');
                break;
            default:
                console.log('Unknown connection state for MongoDB');
        }

        // Handle connection errors
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
