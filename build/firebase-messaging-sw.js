importScripts("https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js"
);

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
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
