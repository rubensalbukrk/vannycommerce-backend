var { db } = require('../../services/firebase')
import { getStorage } from 'firebase-admin/storage';
import { UploadImageToStorage } from '../../hooks/uploadImage'
import { getNextId } from '../../hooks/getNextId'

const storage = getStorage();

export const createFireProduct = async (productData: any, imageFile: any) => {
  try {

    const { estoque, title, price, descrition, descount } = productData;
    const newId = await getNextId();

    const imageUrl = await UploadImageToStorage(imageFile, productData.title)
    const productRef = db.collection('products').doc();

    const productWithImage = {
      id: newId,
      estoque,
      title,
      price, 
      descrition,
      descount,
      img: imageUrl
    };
    //Criar documento no firestore
    await productRef.set(productWithImage);

  } catch (error) {
    console.error('Error creating product:', error);
  }
};

export const getFireProducts = async () => {
  try {

    const querySnapshot = await db.collection('products').get();
    const products = querySnapshot.docs.map((doc: any) => ({ ...doc.data() }));
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
  }
};

export const deleteFireProduct = async (productId: number) => {
  try {
    // Obter o documento do produto pelo ID
    const snapShot = await db.collection('products')
      .where('id', '==', productId)
      .get();

    if (snapShot.empty) {
      console.log('Documento não encontrado na coleção!');
      return null;
    }
    // Obter os dados do produto para encontrar a URL da imagem
    const productData = snapShot.docs[0].data();

    // Verificar se a URL da imagem existe
    if (productData.img) {
      // Extrair o caminho do arquivo da URL
    const decodedUrl = decodeURIComponent(productData.img);
    const filePath = decodedUrl.split('/o/')[1].replace(/\?/g, '&').split('&')[0];

    // Cria uma referência ao arquivo no bucket
    const bucket = storage.bucket(); // Obtém o bucket padrão
    const imageRef = bucket.file(filePath);

    // Deleta o arquivo
    await imageRef.delete();
    }
    // Deletar o documento do Firestore
    await snapShot.docs[0].ref.delete();
    return true;
  } catch (error) {
    console.error('Erro ao deletar o produto:', error);
    return false;
  }
};

