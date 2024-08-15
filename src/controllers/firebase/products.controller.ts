var { db, storage} = require('../../services/firebase')

const getNextId = async () => {
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

export const createFireProduct = async (productData: any) => {
  try {
    // // Upload image to Firebase Storage
    // const imageRef = storage.ref(storage, `images/${imageFile.name}`);
    // await storage.uploadBytes(imageRef, imageFile);

    // // Get image URL
    // const imageUrl = await storage.getDownloadURL(imageRef);

    // Add product to Firestore

    const newId = await getNextId();
    const docRef = await db.collection('products').add({
      ...productData,
      id: newId
    });

    
    console.log('Product created successfully');
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

export const updateFireProduct = async (productId: any, updatedData: any, imageFile: any) => {
  try {
    const productRef = storage.doc(db, 'products', productId);
    
    //ADICIONAR CAMINHO DA IMAGEM NO APARELHO
    let imageUrl = null;

    if (imageFile) {
      // Upload new image to Firebase Storage
      const imageRef = storage.ref(storage, `images/${imageFile.name}`);
      await storage.uploadBytes(imageRef, imageFile);

      // Get new image URL
      imageUrl = await storage.getDownloadURL(imageRef);
    }

    // Update product in Firestore
    await storage.updateDoc(productRef, {
      ...updatedData,
      img: imageUrl || updatedData.img, // Keep old image URL if no new image is provided
    });
    console.log('Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const deleteFireProduct = async (productId: number) => {
  try {
    const snapShot = await db.collection('products')
      .where('id', '==', productId)
      .get();

    if (snapShot.empty) {
      console.log('Documento não encontrado na coleção!');
      return null;
    }
    // // Get product data to find image URL
    // const docSnap = await db.getDoc(querySnapshot);
    // const productData = docSnap.data();
    
    // if (productData.imageUrl) {
    //   // Delete image from Firebase Storage
    //   const imageRef = storage.ref(storage, productData.imageUrl);
    //   await storage.deleteObject(imageRef);
    // }

     // Deletando documento com ID espefico!
     const doc = await snapShot.docs[0].ref.delete();

    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

