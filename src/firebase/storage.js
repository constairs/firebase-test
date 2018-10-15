import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

/* eslint-disable */
  import { app } from './index';
import { resolve } from 'path';
/* eslint-disable */

const storage = firebase.storage(app);

const storageRef = firebase.storage(app).ref();

export function uploadFiles(files) {
  function uploadFile(file) {
    const metadata = {
      contentType: file.type,
      size: file.size,
      name: file.name,
    };
  
    const uploadTask = storageRef.child('issuesFiles/' + file.name).put(file, metadata);
  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
  
        case 'storage/canceled':
          break;
  
        case 'storage/unknown':
          break;
      }
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      });
    });

    return uploadTask.snapshot.ref.getDownloadURL();
  }

  return Promise.all(
    files.map(file => uploadFile(file))
  )
  .then((urls) => {
    console.log(`Some successed: `, urls);
    return (urls);
  })
  .catch((error) => {
    console.log(`Some failed: `, error.message)
  });

}
