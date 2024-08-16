var { db } = require('../../services/firebase')
import { getStorage } from 'firebase-admin/storage';
import { UploadImageToStorage } from '../../hooks/uploadImage'
import { getNextId } from '../../hooks/getNextId'

const storage = getStorage();

export const createFirePromotion = async (PromotionData: any, imageFile: any) => {
  try {

    const { estoque, title, price, descrition, descount } = PromotionData;
    const newId = await getNextId();

    const imageUrl = await UploadImageToStorage(imageFile, PromotionData.title, 'promotions')
    const PromotionRef = db.collection('promotions').doc();

    const PromotionWithImage = {
      id: newId,
      estoque,
      title,
      price, 
      descrition,
      descount,
      img: imageUrl
    };
    //Criar documento no firestore
    await PromotionRef.set(PromotionWithImage);

  } catch (error) {
    console.error('Error creating Promotion:', error);
  }
};

export const getFirePromotions = async () => {
  try {

    const querySnapshot = await db.collection('Promotions').get();
    const Promotions = querySnapshot.docs.map((doc: any) => ({ ...doc.data() }));
    return Promotions;
  } catch (error) {
    console.error('Error getting Promotions:', error);
  }
};

export const deleteFirePromotion = async (PromotionId: number) => {
  try {
    // Obter o documento do produto pelo ID
    const snapShot = await db.collection('Promotions')
      .where('id', '==', PromotionId)
      .get();

    if (snapShot.empty) {
      console.log('Documento não encontrado na coleção!');
      return null;
    }
    // Obter os dados do produto para encontrar a URL da imagem
    const PromotionData = snapShot.docs[0].data();

    // Verificar se a URL da imagem existe
    if (PromotionData.img) {
      // Extrair o caminho do arquivo da URL
    const decodedUrl = decodeURIComponent(PromotionData.img);
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

