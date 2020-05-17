import * as firebase from 'firebase';
import { Dispatch } from 'redux';

import { GameData, GameItem, ItemStatus, PlayerType } from '../../util/types';
import { RootState } from '../reducers';
import {
  CLEAR_GAME,
  INCREMENT_SCORE,
  SET_GAME_OPTS,
  SET_GAME_PLAYERS,
  SET_ITEM_COMPLETE,
  SETUP_GAME,
} from './actionTypes';

const monitorGame = (dispatch: Dispatch, getState: RootState) => {
  return async (docSnap: firebase.firestore.DocumentSnapshot) => {
    if (!docSnap.exists) {
      /*TODO: Should be an alert error
       * Then call
       * clearGame(); and go back to home*/
      console.log('GAME HAS BEEN DELETED');
      return;
    }
    const gameData = docSnap.data() as GameData;

    /*If this is the first update from the game*/
    if (!getState.gameData.gameCode && docSnap.data()?.items !== undefined) {
      gameData.items = setGameItems(gameData.gameType, docSnap.data()?.items);
    }

    dispatch({
      type: SETUP_GAME,
      payload: gameData,
    });

    /* Players Change */
    if (docSnap.data().numPlayers !== getState.gameData.players.length) {
      const players = await docSnap.ref.collection('players').get();
      dispatch(
        setGamePlayers(players.docs.map((doc) => doc.data() as PlayerType))
      );
    }
  };
};

export const createGame = (gameType: number) => {
  return (
    dispatch: Dispatch,
    getState: () => RootState,
    { getFirestore }: any
  ) => {
    getFirestore()
      .collection('activeGames')
      .add({ gameType, host: getState().user.id })
      .then((docRef: firebase.firestore.DocumentReference) => {
        docRef
          .collection('players')
          .doc(getState().user.id)
          .set({ ...getState().user, score: 0 });
        const gameListener = docRef.onSnapshot(
          monitorGame(dispatch, getState())
        );
        dispatch({
          type: SETUP_GAME,
          payload: {
            gameId: docRef.id,
            gameListener,
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
          return console.log('Game Does Not exist');
        }
        const docRef = querySnapshot.docs[0];
        if (docRef.data().playerCount >= 8) {
          /* TODO: Should be an error */
          return console.log('This game is full');
        }

        /* If game exists add user as a player */
        docRef.ref
          .collection('players')
          .doc(getState().user.id)
          .set({ ...getState().user, score: 0 });
        docRef.ref.update({
          playerCount: firebase.firestore.FieldValue.increment(1),
        });

        /* Subscribe to all changes from the game */
        const gameListener = docRef.ref.onSnapshot(
          monitorGame(dispatch, getState())
        );

        /* Get game items */
        dispatch({
          type: SETUP_GAME,
          payload: {
            gameType: docRef.data().gameType,
            gameCode,
            gameId: docRef.id,
            gameListener,
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

    /* Remove self from the game */
    getFirestore()
      .collection('activeGames')
      .doc(getState().gameData.gameId)
      .collection('players')
      .doc(getState().user.id)
      .delete();

    /* If host remove the player from the game */
    if (getState().gameData.host === getState().user.id) {
      getFirestore()
        .collection('activeGames')
        .doc(getState().gameData.gameId)
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

export const setGameItems = (gameType: number, items: GameItem[]) => {
  /* Get random items for game from our items list*/
  const randItems: GameItem[] = items
    .sort(() => 0.5 - Math.random())
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
