import firebase from 'firebase/app';
import 'firebase/messaging';
var firebaseConfig = {
    apiKey: "AIzaSyBCnKFw1j6YTGPM7k2tENPQbKU-6E5o1b4",
    authDomain: "pushnotification-10e1f.firebaseapp.com",
    projectId: "pushnotification-10e1f",
    storageBucket: "pushnotification-10e1f.appspot.com",
    messagingSenderId: "244311029296",
    appId: "1:244311029296:web:840522687aa098daef1ff5"
};

firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({ vapidKey: 'BFrP0lqRLpa6atFWUP_V_zAS5-zeY9eaNRizwxhryq9kaL3aLPJlyIuF7c1Oew3HI0pJaRbtfoX0pN65hP-5atI' }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});