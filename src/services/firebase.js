const { initializeApp ,cert} = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../../vannycommerce-firebase-adminsdk-e7ycz-a3ff967f4f.json');

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

module.exports = db;