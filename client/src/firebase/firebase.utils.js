import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDiOpo4zG6DdtozAXSfpBZADltuQ7oOdnc',
  authDomain: 'crown-db-cc793.firebaseapp.com',
  databaseURL: 'https://crown-db-cc793.firebaseio.com',
  projectId: 'crown-db-cc793',
  storageBucket: '',
  messagingSenderId: '322967410072',
  appId: '1:322967410072:web:bf4a87bdc4e7e2d5',
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData })
    } catch (error) {
      console.error('error creating user', error.message)
    }
  }

  return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })

  transformedCollections.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {})
  return transformedCollections
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  }) 
}

// for GoogleAuth => https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider.html#setcustomparameters
export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
