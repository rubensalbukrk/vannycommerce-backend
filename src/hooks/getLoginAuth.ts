var {db} = require('../services/firebase');
import bcrypt from 'bcrypt'

const getLoginAuth = async (email: string, password: string) => {
    try {
      
      const usersRef = db.collection('users');
      const user = await usersRef
      .where('email', '==', email)
      .get();
      const thisUser = user.docs[0].data();

        return thisUser

    } catch (error) {
      console.error("Problema ao obter usuário, tente novamente!")
    }
  };

  export default getLoginAuth;