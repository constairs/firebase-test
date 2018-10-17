import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const database = firebase.database();

export function addUserToDb(userEmail) {

  const user = userEmail.split('@')[0];

  const userData = {
    email: userEmail,
    issues: [],
  };

  return new Promise((resolve, reject) => {
    firebase.database().ref('/users/' + user).set(userData)
    .then(() => resolve())
    .catch((error) => reject(error));
  });
}

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


export function createIssue(user, issueId, createdAt, issueTitle, issueDescription, createdDate, attachedFiles) {

  const issueData = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    description: issueDescription,
    attachedFiles: attachedFiles
  };

  return new Promise((resolve, reject) => {
    firebase.database().ref(user + '/issues/' + issueId).set(issueData)
    .then(() => resolve(issueData))
    .catch((error) => reject(error));
  });
}

export function editIssueData(issueId, createdAt, issueTitle, issueDescription, updatedAt, attachedFiles = []) {

  const updatedIssue = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    updatedAt: updatedAt,
    description: issueDescription,
    attachedFiles: attachedFiles
  };

  console.log(updatedIssue);

  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + issueId).update(updatedIssue,
    (error) => {
      if (error) {
        reject(error);
      }
      resolve(updatedIssue);
    }
      ).then(() => {resolve(updatedIssue)}).catch((error) => {reject(error)});
  });
}



export function deleteIssueData(issueId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + issueId).remove()
    .then(() => resolve(issueId))
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
