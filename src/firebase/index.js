import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { config } from './config';

export const app = firebase.initializeApp(config);

export function createUserWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
