import Constants from 'expo-constants';

import firebase from '../config/firebaseConfig';

const db = firebase.firestore();
let gameId = '';
const userId = Constants.deviceId;

const setGameId = (id: string) => {
  gameId = id;
};

const startGame = () => {
  const startTime = new Date();
  startTime.setSeconds(startTime.getSeconds() + 3);
  currGame(gameId).update({ startTime: startTime.getTime() });
};

const incrementScore = () => {
  currGame(gameId)
    .collection('players')
    .doc(userId)
    .update({
      score: firebase.firestore.FieldValue.increment(1),
    });
};

const gameOver = (playerId: string) => {
  currGame(gameId).update({
    gameWinner: playerId,
    gameEnded: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const currGame = (gId: string): firebase.firestore.DocumentReference => {
  return db.collection('activeGames').doc(gId);
};

const Firebase = {
  setGameId,
  startGame,
  incrementScore,
  gameOver,
};

export default Firebase;
