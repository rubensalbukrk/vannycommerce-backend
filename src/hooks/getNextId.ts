var { db } = require('../services/firebase')

export const getNextId = async () => {
    const counterRef = db.collection('products').doc('productCounter');
    const counterDoc = await counterRef.get();
  
    if (!counterDoc.exists) {
      await counterRef.set({ id: 1 });
      return 1;
    }
    const currentId = counterDoc.data().id;
    await counterRef.update({ id: currentId + 1 });
    return currentId;
  };