import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDP5jy66Zlhq1ZgP5i63rYftxmsV_j6SaM",
    authDomain: "ticket-9dd8c.firebaseapp.com",
    projectId: "ticket-9dd8c",
    storageBucket: "ticket-9dd8c.appspot.com",
    messagingSenderId: "91734333449",
    appId: "1:91734333449:web:357db34d1cc6ea05b200d8",
    measurementId: "G-YF8C66GRG2"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
const messaging = getMessaging(app);

messaging.getToken({vapidKey: "BCn0-DCa78RW09oEMjoIP4iuENRZS_dW8wNvSv24tUtVLSYw9lRMlTAvdEl0Wa4UpFXM7oMxwcHYutuEZkv1K3I"});




import { getMessaging, getToken } from "firebase/messaging";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

getToken(messaging, { vapidKey: 'BCn0-DCa78RW09oEMjoIP4iuENRZS_dW8wNvSv24tUtVLSYw9lRMlTAvdEl0Wa4UpFXM7oMxwcHYutuEZkv1K3I' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
