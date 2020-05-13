import Constants from 'expo-constants';

import firebase from '../config/firebaseConfig';
import { User } from '../util/types';

const db = firebase.firestore();

const newUser = async () => {
  let user: User = {
    name: 'Player 1',
    avatar: '',
    id: Constants.deviceId,
  };
  await db
    .collection('users')
    .doc(user.id)
    .get()
    .then((data) => {
      if (data.exists) {
        user = data.data() as User;
      } else {
        db.collection('users').doc(user.id).set(user);
      }
    });

  return user;
};

const Firebase = {
  newUser,
};

export default Firebase;
