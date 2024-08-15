var db = require('../../services/firebase')

export const getFireProducts = async () => {
  try {
    const querySnapshot = await db.collection('products')
    .get();
    const products = querySnapshot.docs.map((doc: any) => ({ ...doc.data() }));
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
  }
};

