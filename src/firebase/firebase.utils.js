import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyDBtt5z5Akr5JbuJ72TtGVhhvFlMxt-xXw",
        authDomain: "e-commerce-db-35689.firebaseapp.com",
        projectId: "e-commerce-db-35689",
        storageBucket: "e-commerce-db-35689.appspot.com",
        messagingSenderId: "683715014868",
        appId: "1:683715014868:web:4d9f9a55cccb1d1b1fcb41",
        measurementId: "G-LFTRZ7NF0Z"
      }

      export const createUserProfileDocument = async (userAuth, additionalData) => {
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`)

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
          const { displayName, email} = userAuth;
          const createdAt = new Date();

          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            })
          } catch (error) {
            console.log('error creating user', error.message);
          }
        }
        return userRef;
      }

      

      firebase.initializeApp(config);

      export const auth = firebase.auth();
      export const firestore = firebase.firestore();
      
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      export const signInWithGoogle = () => auth.signInWithPopup(provider);
      
      export default firebase;