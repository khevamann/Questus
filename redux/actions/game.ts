import * as firebase from 'firebase';
import { Dispatch } from 'redux';

import Firebase from '../../providers/firebase';
import {
  GameData,
  GameItem,
  GameStatus,
  ItemStatus,
  PlayerType,
} from '../../util/types';
import { RootState } from '../reducers';
import {
  CLEAR_GAME,
  SET_GAME_OPTS,
  SET_GAME_PLAYERS,
  SET_ITEM_COMPLETE,
  SETUP_GAME,
} from './actionTypes';
import {
  displayAlert,
  displayCustomAlert,
  joinFailure,
  joinSuccess,
  setGameStatus,
} from './status';

const monitorGame = (dispatch: Dispatch, getState: () => RootState) => {
  return async (docSnap: firebase.firestore.DocumentSnapshot) => {
    /* Check if game has been deleted */
    if (!docSnap.exists) {
      return dispatch(setGameStatus(GameStatus.DELETED));
    }

    const game = docSnap.data() as GameData;

    /* Game Start */
    if (!getState().game.startTime && game.startTime !== undefined) {
      setTimeout(() => {
        dispatch(setGameStatus(GameStatus.PLAYING));
      }, game.startTime - Date.now());
    }

    /*Game Over*/
    if (!getState().game.gameWinner && game.gameWinner !== undefined) {
      if (game.gameWinner === getState().user.id) {
        dispatch(displayAlert('GAME_OVER_WIN'));
      } else {
        const winner = getState().game.players.find(
          (player: PlayerType) => player.id === game.gameWinner
        );
        const title = winner.name ? `${winner.name} wins!` : 'Game Over';
        dispatch(displayCustomAlert('GAME_OVER_LOSE', { title }));
      }
    }
    /*If this is the first update from the game*/
    if (
      getState().game.items.length === 0 &&
      docSnap.data()?.items !== undefined
    ) {
      game.items = setGameItems(game.gameType, docSnap.data()?.items);
    } else {
      game.items = getState().game.items;
    }
    dispatch({
      type: SETUP_GAME,
      payload: game,
    });
  };
};

const monitorPlayers = (dispatch: Dispatch, maxScore: number) => {
  return (docSnap: firebase.firestore.QuerySnapshot) => {
    if (docSnap.size === 0) return;
    const players: PlayerType[] = [];
    docSnap.docs.forEach((doc: firebase.firestore.DocumentData) => {
      const player = doc.data() as PlayerType;
      if (maxScore > 0 && player.score >= maxScore) {
        player.score = maxScore;
        Firebase.gameOver(player.id);
      }
      players.push(player);
    });

    dispatch({
      type: SET_GAME_PLAYERS,
      payload: players,
    });
  };
};

export const createGame = (gameType: number) => {
  return async (
    dispatch: Dispatch,
    getState: () => RootState,
    { getFirestore }: any
  ) => {
    const docRef = await getFirestore()
      .collection('activeGames')
      .add({ gameType, host: getState().user.id });
    docRef
      .collection('players')
      .doc(getState().user.id)
      .set({ ...getState().user, score: 0 })
      .then();
    const gameListener = docRef.onSnapshot(monitorGame(dispatch, getState));
    const playerListener = docRef
      .collection('players')
      .onSnapshot(monitorPlayers(dispatch, getState().game.gameType));

    dispatch({
      type: SETUP_GAME,
      payload: {
        gameId: docRef.id,
        snapshots: { gameListener, playerListener },
      },
    });
  };
};

export const joinGame = (gameCode: string) => {
  return async (
    dispatch: Dispatch,
    getState: () => RootState,
    { getFirestore }: any
  ) => {
    if (!gameCode.match(/[A-Z]\d[A-Z]\d/g))
      return dispatch(joinFailure('GAME_DNE'));
    const querySnapshot = await getFirestore()
      .collection('activeGames')
      .where('gameCode', '==', gameCode)
      .get();
    if (querySnapshot.empty) {
      return dispatch(joinFailure('GAME_DNE'));
    }
    const docRef = querySnapshot.docs[0];
    if (docRef.data().playerCount >= 8) {
      return dispatch(joinFailure('GAME_FULL'));
    }

    /* If game exists add user as a player */
    docRef.ref
      .collection('players')
      .doc(getState().user.id)
      .set({ ...getState().user, score: 0 })
      .then();
    docRef.ref
      .update({
        playerCount: firebase.firestore.FieldValue.increment(1),
      })
      .then();

    /* Subscribe to all changes from the game */
    const gameListener = docRef.ref.onSnapshot(monitorGame(dispatch, getState));
    const playerListener = docRef.ref
      .collection('players')
      .onSnapshot(monitorPlayers(dispatch, docRef.data().gameType));
    dispatch({
      type: SETUP_GAME,
      payload: {
        gameType: docRef.data().gameType,
        gameCode,
        gameId: docRef.id,
        snapshots: { gameListener, playerListener },
        startTime: docRef.data().startTime,
      },
    });
    dispatch(joinSuccess());
  };
};

export const clearGame = () => {
  return (
    dispatch: Dispatch,
    getState: () => RootState,
    { getFirestore }: any
  ) => {
    /* Unsubscribe from game and player onSnapshot */
    try {
      getState().game.snapshots.gameListener();
      getState().game.snapshots.playerListener();
    } catch (e) {
      console.log('Error Removing listeners', e);
    }

    /* Remove self from the game */
    getFirestore()
      .collection('activeGames')
      .doc(getState().game.gameId)
      .collection('players')
      .doc(getState().user.id)
      .delete();

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
