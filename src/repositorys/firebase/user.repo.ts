var { db } = require('../../services/firebase')
import { getStorage } from 'firebase-admin/storage';
import { UploadImageToStorage } from '../../hooks/uploadImage'
import { getNextId } from '../../hooks/getNextId'
import { User } from '@prisma/client';

const storage = getStorage();

export const createFireUser = async (UserData: User, imageFile: any) => {
  try {

    const { name, email, address, city, phone, password } = UserData;
    const newId = await getNextId();

    const imageUrl = await UploadImageToStorage(imageFile, UserData.name, 'user-profiles')
    const UserRef = db.collection('Users').doc();

    const UserWithImage = {
      id: newId,
      name,
      email,
      address, 
      city,
      phone,
      password,
      avatar: imageUrl
    };
    //Criar documento no firestore
    await UserRef.set(UserWithImage);

  } catch (error) {
    console.error('Error creating User:', error);
  }
};

export const getFireUsers = async () => {
  try {

    const querySnapshot = await db.collection('Users').get();
    const Users = querySnapshot.docs.map((doc: any) => ({ ...doc.data() }));
    return Users;
  } catch (error) {
    console.error('Error getting Users:', error);
  }
};

export const deleteFireUser = async (UserId: number) => {
  try {
    // Obter o documento do produto pelo ID
    const snapShot = await db.collection('Users')
      .where('id', '==', UserId)
      .get();

    if (snapShot.empty) {
      console.log('Documento não encontrado na coleção!');
      return null;
    }
    // Obter os dados do produto para encontrar a URL da imagem
    const UserData = snapShot.docs[0].data();

    // Verificar se a URL da imagem existe
    if (UserData.img) {
      // Extrair o caminho do arquivo da URL
    const decodedUrl = decodeURIComponent(UserData.img);
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

