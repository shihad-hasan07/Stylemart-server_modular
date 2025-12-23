import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import seedAdmin from './seedAdmin/seedAdmin.js';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(process.env.PORT, async () => {
        await seedAdmin()
        console.log(`Example app listening on port ${process.env.PORT}`);
    });
}
