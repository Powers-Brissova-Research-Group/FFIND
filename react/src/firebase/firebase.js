import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

class Firebase {
  constructor () {
    app.initializeApp(config)
    app.auth().signInAnonymously().catch(function (error) {
      let errorCode = error.code
      let errorMessage = error.message
      console.error(`${errorCode}: ${errorMessage}`)
    })

    this.firestore = app.firestore()
  }

  addNewUserInfo (formInfo) {
    const { detect } = require('detect-browser')
    var browser = detect()

    let data = {
      institution: formInfo.institution,
      role: formInfo.role,
      date_accessed: app.firestore.Timestamp.fromDate(new Date()),
      browser_name: browser.name,
      browser_version: browser.version
    }

    this.firestore.collection('user_data').add(data)
  }
}

export default Firebase
