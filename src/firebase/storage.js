import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

/* eslint-disable */
  import { app } from './index';
/* eslint-disable */

const storage = firebase.storage(app);

const storageRef = storage.ref();

export function uploadFiles(files) {
  function uploadFile(file) {

    const metadata = {
      contentType: file.type,
      size: file.size,
      name: file.name,
    };

    const fileRef = storageRef.child('issuesFiles/' + file.name);
  
    const uploadTask = fileRef.put(file, metadata);
  
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
        console.log(downloadURL);
      });
    });

    return file.name;
    // return uploadTask.snapshot.ref.getDownloadURL();
  }

  return Promise.all(
    files.map(file => uploadFile(file))
  )
  .then((urls) => {
    return (urls);
  })
  .catch((error) => {
    console.log(`Some failed: `, error.message);
  });

}

export function downloadFiles(filename) {

  return new Promise((resolve, reject) => {

    const fileRef = storageRef.child('issuesFiles/' + filename);

    console.log(fileRef);

    fileRef.getDownloadURL().then((url) => {
  
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';

      xhr.onload = function(event) {
        if(xhr.status !== 200) {
          reject(xhr.statusText);
        }

        if(xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response);
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => reject(Error("There was a network error."));

      xhr.open('GET', url);
      xhr.send();

    }).catch(function(error) {
      reject(error);
    });
  
  });

}
