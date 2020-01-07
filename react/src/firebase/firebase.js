import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAzeeZ3TjLTpU2HBlj6mVxH96FZL3lIzHQ',
  authDomain: 'pancreatlas-9e744.firebaseapp.com',
  databaseURL: 'https://pancreatlas-9e744.firebaseio.com',
  projectId: 'pancreatlas-9e744',
  storageBucket: 'pancreatlas-9e744.appspot.com',
  messagingSenderId: '22764934187',
  appId: '1:22764934187:web:6b6757920416d8d2af466e',
  measurementId: 'G-0K12Y4KX1E'
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
      date_accessed: Date.now(),
      browser_name: browser.name,
      browser_version: browser.version
    }

    this.firestore.collection('user_data').add(data)
  }
}

export default Firebase
