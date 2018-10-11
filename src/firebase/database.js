import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const database = firebase.database();

export function createIssueData(createdAt, issueTitle, issueDescription) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('issues/' + issueTitle).set({
      title: issueTitle,
      createdAt: createdAt,
      description: issueDescription
    })
    .then(() => resolve({
      title: issueTitle,
      createdAt: createdAt,
      description: issueDescription
    }))
    .catch((error) => reject(error));
  });
}

export function fetchIssues() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/').once('value')
    .then((snapshot) => {
      resolve(snapshot.val());
    })
    .catch((error) => reject(error));
  });
}


