import admin from "firebase-admin"

const serviceAccount = JSON.parse(
    process.env.FIREBASES_SERVICE_ACCOUNT
)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
    console.log('Firebase Admin initialized successfully');
}

export default admin;