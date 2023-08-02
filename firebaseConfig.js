import { initializeApp, initializeAuth } from "firebase/app";
import {getAuth} from 'firebase/auth'
// import { initializeAuth, initializeApp,
//   browserSessionPersistence, browserPopupRedirectResolver } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyATFLI2N49XVjrEeOyJPGLJ_dRnF8GE5KA",
  authDomain: "kaizen-af077.firebaseapp.com",
  projectId: "kaizen-af077",
  storageBucket: "kaizen-af077.appspot.com",
  messagingSenderId: "421493064334",
  appId: "1:421493064334:web:52b4e6ae25eed37a957fdf",
  measurementId: "G-CMPD2D7Y62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// const firebaseApp = initializeApp(firebaseConfig);

// export const auth = initializeAuth(firebaseApp, {
//   persistence: browserSessionPersistence,
//   popupRedirectResolver: browserPopupRedirectResolver,
// });


// IOS: 421493064334-gn43gp39vlara8q1f5nuqlb5agj2had8.apps.googleusercontent.com
// Android: 421493064334-1ucrk45siptq302fhdqivm7p8jblf4m5.apps.googleusercontent.com

// "main": "node_modules/expo/AppEntry.js",