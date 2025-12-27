import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import seedAdmin from './seedAdmin/seedAdmin.js';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(process.env.PORT, async () => {
        // admin e promote hosse na karon -->vercel serverless function based platform
        // vps hosting e kaj krbe eita
        // await seedAdmin()
        console.log(`Example app listening on port ${process.env.PORT}`);
    });
}
