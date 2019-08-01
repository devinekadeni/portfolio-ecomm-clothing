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
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

// for GoogleAuth => https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider.html#setcustomparameters
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
