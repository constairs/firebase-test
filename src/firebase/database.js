import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const database = firebase.database();

export function createIssueData(issueId, createdAt, issueTitle, issueDescription) {

  const issueData = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    description: issueDescription
  };

  return new Promise((resolve, reject) => {
    firebase.database().ref('issues/' + issueId).set(issueData)
    .then(() => resolve(issueData))
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

export function editIssueData(issueId, createdAt, issueTitle, issueDescription, updatedAt) {

  const updateIssue = {
    issueId: issueId,
    title: issueTitle,
    createdAt: createdAt,
    updatedAt: updatedAt,
    description: issueDescription
  };

  return new Promise((resolve, reject) => {
    firebase.database().ref('/issues/' + issueId).update(updateIssue, (error) => {
      if (error) {
        reject(error);
      }
      resolve(updateIssue)
    });
  });
}