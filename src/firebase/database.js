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

export function fetchUsers() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/users/').once('value')
    .then((snapshot) => {
      resolve(snapshot.val());
    })
    .catch((error) => reject(error));
  });
}

export function createIssue(user, issueId, createdAt, issueTitle, issueDescription, issueFor, createdDate, attachedFiles = []) {
  const issueData = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    description: issueDescription,
    for: issueFor.value,
    attachedFiles: attachedFiles,
    owner: user.split('@')[0],
  };

  return Promise.all([
    firebase.database().ref('/users/' + issueData.owner + '/myIssues/').set(issueData),
    firebase.database().ref('/users/' + issueFor.value + '/issues/').set(issueData),
  ]).then(() => {
    return issueData
  })
  .catch((error) => reject(error));
}

export function editIssue(user, issueId, createdAt, issueTitle, issueDescription, issueFor, updatedAt, attachedFiles = []) {

  const updatedIssue = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    updatedAt: updatedAt,
    description: issueDescription,
    for: issueFor,
    attachedFiles: attachedFiles,
    owner: user.split('@')[0],
  };

  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + issueId).update(updatedIssue,
    (error) => {
      if (error) {
        reject(error);
      }
      resolve(updatedIssue);
    }).then(() => {resolve(updatedIssue)}).catch((error) => {reject(error)});
  });
}

export function answerIssue(answerData) {

  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + answerData.id + '/answer/').update(answerData.answerInfo,
      (error) => {
        if (error) {
          reject(error);
        }
        resolve(answerData);
      }
    ).then(() => {resolve(answerData)}).catch((error) => {reject(error)});
  })
  
}

export function deleteIssueData(issueId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + issueId).remove()
    .then(() => resolve(issueId))
    .catch((error) => reject(error));
  });
}

export function fetchIssues(fetchingParams) {
  const filter = fetchingParams.user.split('@')[0];
  const ref = firebase.database().ref('/issues/');

  if(fetchingParams.forOwner) {
    return new Promise((resolve, reject) => {
      ref.orderByChild('owner').equalTo(filter).once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  } else {
    return new Promise((resolve, reject) => {
      ref.orderByChild('for').equalTo(filter).once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
    });
  }
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
