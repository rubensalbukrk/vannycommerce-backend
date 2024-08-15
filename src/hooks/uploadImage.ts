
import { getStorage } from 'firebase-admin/storage';

const storage = getStorage();

export const UploadImageToStorage = async (imageFile: any, fileName: string) => {
    try {
      const bucket = storage.bucket(); 
      const file = bucket.file(`products/${fileName}`);
  
      // Verifique se imageFile e imageFile.buffer estão definidos
      if (!imageFile || !imageFile.buffer) {
        throw new Error('No file buffer found.');
      }
  
      // Fazer o upload do arquivo
      await file.save(imageFile.buffer, {
        metadata: {
          contentType: imageFile.mimetype,
        },
      });
      // Obter a URL de download da imagem
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/products%2F${fileName}?alt=media`;
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer o upload da imagem:', error);
      throw error;
    }
  };