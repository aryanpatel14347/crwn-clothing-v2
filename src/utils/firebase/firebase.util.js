import {initializeApp} from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "firebase/auth";
import {getFirestore, doc,getDoc, setDoc, collection,writeBatch, query, getDocs } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyChmtyfHhwl5Fu0CK-omyEvmc910J-3DqA",
    authDomain: "ztm-ecomm-web-app-react.firebaseapp.com",
    projectId: "ztm-ecomm-web-app-react",
    storageBucket: "ztm-ecomm-web-app-react.appspot.com",
    messagingSenderId: "380518283498",
    appId: "1:380518283498:web:1024536e3f326c9e19ff93"
};

// Initialize Firebase
//const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
//Login using google auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

//Firestore
export const db = getFirestore();

//Collection method is most improtant to write data on firestore.

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
const collectionRef = collection(db, collectionKey);

//writebatch is just like transaction in db.
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done!');

};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
/*    const categoryMap = querySnapshot.docs
        .reduce((acc, docSnapshot) => {
       const {title, items} = docSnapshot.data();
       acc[title.toLowerCase()] = items;
       return acc;
    }, {});*/

  //  return categoryMap;
};

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot.exists());

    //if data not exisit
    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation
                });
        }catch (error){
            console.log('Error creating user',error.message);
        }
    }
    //if user data exist
    //return userDocRef;
    return userSnapshot;


    //return userdocref
};


//signup with email and password firebase
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {onAuthStateChanged(auth, callback)};

export const getCurrentUser = () => {
return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
              auth,
                (userAuth) => {
                  unsubscribe();
                  resolve(userAuth);
                },
                reject
            );
    });
};
