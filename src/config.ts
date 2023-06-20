import * as dotenv from 'dotenv';
dotenv.config();

export const user = process.env.DB_USER;
export const passwd = process.env.DB_PASSWORD;
export const db = process.env.DB_NAME;
export const secret = process.env.JWT_SECRET;
export const firebaseConfig = {
  apiKey: 'AIzaSyDjCs-Y1M5_ZrOkqi027QAPZfqZ4Zk6Ijw',
  authDomain: 'proyecto-manhattan-3ba91.firebaseapp.com',
  projectId: 'proyecto-manhattan-3ba91',
  storageBucket: 'proyecto-manhattan-3ba91.appspot.com',
  messagingSenderId: '370645271028',
  appId: '1:370645271028:web:aea45bcd2697b6c573b9a1',
};
