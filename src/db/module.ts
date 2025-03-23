import {Module, Global} from '@nestjs/common';
import {MongoClient} from 'mongodb';

@Global()
@Module({
    providers: [
        {
            provide: 'MONGO_CLIENT',
            useFactory: async () => {
                const uri = `mongodb+srv://admin:admin@cluster0.rmixi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
                const client = new MongoClient(uri);
                await client.connect();
                console.log("connected to client");

                const db = await client.db("sewing_equipment");

                console.log('Connected to MongoDB!');
                return db;
            },
        },
    ],
    exports: ['MONGO_CLIENT'],
})
export class DatabaseModule {
}