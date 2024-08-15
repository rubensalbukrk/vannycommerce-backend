const { initializeApp ,cert} = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('../../vannycommerce-firebase-adminsdk-e7ycz-a3ff967f4f.json');

const app = initializeApp({
    credential: cert(serviceAccount)
})

const storage = getStorage(app);
const db = getFirestore(app);

module.exports = { db, storage };