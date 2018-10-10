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

export function signInWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signOut() {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(() => {
      resolve('Logout successed!');
    }).catch((error) => {
      reject(error);
    });
  });
}

export function updateProfile(profileName, profileImg) {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: profileName,
      photoURL: profileImg
    }).then(() => {
      resolve({ profileName, profileImg });
    }).catch((error) => {
      reject(error);
    });
  });
}
