import joi from 'joi';

export type Avatar = {
  urlOriginal: string;
  url: string;
  mimetype: string;
  size: number;
};

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  avatar: Avatar;
};

export type UserLogin = {
  user: string;
  password: string;
};

export const userSchema = joi.object<User>({
  userName: joi.string().required(),
  email: joi.string().email().required().messages({
    'string.base': `"email" debe ser tipo 'texto'`,
    'string.email': `El "email"  no es válido`,
    'string.empty': `El "email" no puede faltar`,
  }),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
});
