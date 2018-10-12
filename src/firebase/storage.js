import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const storage = firebase.storage('gs://test-d4d6d.appspot.com');

const storageRef = storage.child('images');
