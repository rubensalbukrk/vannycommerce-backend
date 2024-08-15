import * as yup from 'yup';

const required = yup.string().required();

export const userValidation = yup.object({
  
    name: yup.string().required("Um nome é obrigatório!"),
    email: yup.string().email("Email inválido, tente novamente!").required("Um Email é obrigatório!"),
    address: yup.string().required("Um Endereço é obrigatório!"),
    city: yup.string().required("Uma Cidade é obrigatória!"),
    phone: yup.number().required("Um Telefone é obrigatório!"),
    password: yup.string().min(8, "!A senha deve ter pelo menos 8 caracteres").required("A Senha é obrigatória"),

  });
  