import mongodb from 'mongodb';

export const connectToDatabase = async () => {
    const uri = process.env.MONGODB_URI ;
    const client = new mongodb.MongoClient(uri);

    try {
        await client.connect();
        console.log(`Connected to MongoDB`);
        return client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}