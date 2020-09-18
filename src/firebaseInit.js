import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCkaH2x1_0yBsSNU5u66NQB4d_oXV8107A",
  authDomain: "srm-push-notifications.firebaseapp.com",
  databaseURL: "https://srm-push-notifications.firebaseio.com",
  projectId: "srm-push-notifications",
  storageBucket: "srm-push-notifications.appspot.com",
  messagingSenderId: "1058332974848",
  appId: "1:1058332974848:web:2e621ffe62e04a2e021de5",
  measurementId: "G-HFJ9L95PMY",
};

firebase.initializeApp(firebaseConfig);
let messaging;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
} else {
  messaging = null;
}

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted" && messaging) {
          return messaging.getToken();
        }
      })
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
