import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const database = firebase.database();

export function createIssueData(issueId, createdAt, issueTitle, issueDescription) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('issues/' + issueId).set({
      issueId: issueId,
      title: issueTitle,
      createdAt: createdAt,
      description: issueDescription
    })
    .then(() => resolve({
      issueId: issueId,
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

export function getIssue(issueId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + issueId).once('value')
    .then((snapshot) => {
      resolve(snapshot.val());
    })
    .catch((error) => reject(error));
  });
}

export function deleteIssueData(issueId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + issueId).remove()
    .then(() => resolve(issueId))
    .catch((error) => reject(error));
  });
}
