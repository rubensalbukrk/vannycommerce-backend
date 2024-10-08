import bcrypt from 'bcrypt'
import { User } from '@prisma/client';
var { db } = require('../../services/firebase')
import { getNextId } from '../../hooks/getNextId'
import { getStorage } from 'firebase-admin/storage';
import { UploadImageToStorage } from '../../hooks/uploadImage'


const storage = getStorage();

export const createFireUser = async (UserData: Omit<User, 'id' | 'avatar' | 'createAt' | 'updatedAt'>, imageFile: any) => {
  try {

    const { name, email, address, city, phone, password } = UserData;

    const imageUrl = await UploadImageToStorage(imageFile, UserData.name, 'user-profiles')
    const UserRef = db.collection('users').doc();

    const hash = await bcrypt.hash(password, 8);

    let UserWithImage = {
      id: UserRef.id,
      name,
      email,
      address, 
      city,
      phone,
      password: hash,
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

    const querySnapshot = await db.collection('users').get();
    const Users = querySnapshot.docs.map((doc: any) => ({ ...doc.data() }));
    return Users;
  } catch (error) {
    console.error('Error getting Users:', error);
  }
};

export const deleteFireUser = async (UserId: string) => {
  try {
    // Obter o documento do produto pelo ID
    const snapShot = await db.collection('users')
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

