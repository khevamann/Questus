import * as firebase from 'firebase';

import 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

const Firebase = {
  checkToken: (token: string) => {
    return firebase
      .firestore()
      .collection('activeGames')
      .doc(`${token}`)
      .set({ gameId: token });
  },
};

export default Firebase;
