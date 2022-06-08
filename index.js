  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDP5jy66Zlhq1ZgP5i63rYftxmsV_j6SaM",
    authDomain: "ticket-9dd8c.firebaseapp.com",
    projectId: "ticket-9dd8c",
    storageBucket: "ticket-9dd8c.appspot.com",
    messagingSenderId: "91734333449",
    appId: "1:91734333449:web:357db34d1cc6ea05b200d8",
    measurementId: "G-YF8C66GRG2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);