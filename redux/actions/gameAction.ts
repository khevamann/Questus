import * as firebase from 'firebase';
import { Dispatch } from 'redux';

import { generateGameCode } from '../../util/helpers';
import { GameItem, ItemStatus, PlayerType } from '../../util/types';
import { RootState } from '../reducers';
import {
  CLEAR_GAME,
  INCREMENT_SCORE,
  SET_GAME_CODE,
  SET_GAME_OPTS,
  SET_GAME_PLAYERS,
  SET_ITEM_COMPLETE,
  SETUP_GAME,
} from './actionTypes';

const monitorGame = (dispatch: Dispatch) => {
  return (docSnap: firebase.firestore.QuerySnapshot) => {
    if (docSnap.size === 0) {
      /*TODO: Should be an alert error*/
      console.log('GAME HAS BEEN DELETED');
      return;
    }
    dispatch(
      setGamePlayers(docSnap.docs.map((doc) => doc.data() as PlayerType))
    );
    console.log(docSnap.docs.map((doc) => doc.data() as PlayerType));
    console.log('Game Update!', docSnap.size);
  };
};

export const createGame = (gameType: number) => {
  return (
    dispatch: Dispatch,
    getState: () => RootState,
    { getFirestore }: any
  ) => {
    const gameCode = generateGameCode(gameType);
    getFirestore()
      .collection('activeGames')
      .add({ gameType, gameCode, host: getState().user.id })
      .then((docRef: firebase.firestore.DocumentReference) => {
        docRef
          .collection('players')
          .doc(getState().user.id)
          .set({ ...getState().user, score: 0 });
        const gameListener = docRef
          .collection('players')
          .onSnapshot(monitorGame(dispatch));
        const items = setGameItems(getState().gameData.gameType);
        dispatch({
          type: SETUP_GAME,
          payload: {
            gameCode,
            gameId: docRef.id,
            gameListener,
            isHost: true,
            items,
          },
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
};

export const joinGame = (gameCode: string) => {
  return (
    dispatch: Dispatch,
    getState: () => RootState,
    { getFirestore }: any
  ) => {
    getFirestore()
      .collection('activeGames')
      .where('gameCode', '==', gameCode)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        if (querySnapshot.empty) {
          /* TODO: Should be an error */
          return console.log('GAME DOes Not exist');
        }
        const docRef = querySnapshot.docs[0];
        docRef.ref
          .collection('players')
          .doc(getState().user.id)
          .set({ ...getState().user, score: 0 });
        const gameListener = docRef.ref
          .collection('players')
          .onSnapshot(monitorGame(dispatch));
        const items = setGameItems(getState().gameData.gameType);
        dispatch({
          type: SETUP_GAME,
          payload: {
            gameCode,
            gameId: docRef.id,
            gameListener,
            items,
          },
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
};

export const clearGame = () => {
  return (
    dispatch: Dispatch,
    getState: () => RootState,
    { getFirestore }: any
  ) => {
    /* Unsubscribe from game onSnapshot */
    if (getState().gameData.gameListener) getState().gameData.gameListener();
    /*FIXME should be handled as a cloud function
     * On frontend: delete user from players collection
     * On server: remove check if player is a host and delete everything */
    if (getState().gameData.isHost) {
      getFirestore()
        .collection('activeGames')
        .doc(getState().gameData.gameId)
        .delete();
    } else {
      getFirestore()
        .collection('activeGames')
        .doc(getState().gameData.gameId)
        .collection('players')
        .doc(getState().user.id)
        .delete();
    }
    dispatch({
      type: CLEAR_GAME,
      payload: 0,
    });
  };
};

export const setGameType = (gameType: number) => ({
  type: SET_GAME_OPTS,
  payload: gameType,
});

export const setGameCode = (code: string) => ({
  type: SET_GAME_CODE,
  payload: code,
});

export const setGameItems = (gameType: number) => {
  const itemList: GameItem[] = require('../../assets/items.json');

  /* Get random items for game from our items list*/
  const randItems: GameItem[] = itemList
    .sort(() => 0.5 - Math.random())
    .slice(0, gameType)
    .map((item: GameItem, index) =>
      index % 3 === 0
        ? { ...item, status: ItemStatus.INPROGRESS }
        : { ...item, status: ItemStatus.INCOMPLETE }
    );

  /* Creates sub arrays of elements for each item set*/
  return Array.from(Array(gameType / 3)).map((val, index) =>
    randItems.slice(index * 3, index * 3 + 3)
  );
};

export const setItemComplete = (index: number) => ({
  type: SET_ITEM_COMPLETE,
  payload: index,
});

export const setGamePlayers = (players: PlayerType[]) => ({
  type: SET_GAME_PLAYERS,
  payload: players,
});

export const incrementScore = (userId: string) => ({
  type: INCREMENT_SCORE,
  payload: userId,
});
