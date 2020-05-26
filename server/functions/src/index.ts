import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export enum ItemStatus {
  INCOMPLETE = -1,
  INPROGRESS = 0,
  COMPLETE = 1,
}

export type GameItem = {
  name: string;
  status: ItemStatus;
};

admin.initializeApp(functions.config().firebase);

export const createGame = functions.firestore
  .document('activeGames/{gameId}')
  .onCreate(async (event: DocumentSnapshot) => {
    if (event.data() === undefined)
      throw new Error('Game was not created successfully...');
    /* Generate a game code and increment the game numbers */
    const gameNum: number = await getGameNumber();
    return event.ref.update({
      items: setGameItems(event.data()?.gameType),
      playerCount: 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      gameCode: generateGameCode(gameNum),
    });
  });
//
// export const setLeaders = functions.firestore
//   .document('activeGames/{gameId}/players/{playerId}')
//   .onUpdate(async (change: Change<DocumentSnapshot>) => {
//     if (change.after.data() === undefined) throw new Error('Game Deleted...');
//     change.after.ref.parent.parent?.collection('leaders').
//   });

const getGameNumber = async (): Promise<number> => {
  const configRef = admin.firestore().collection('config').doc('game-config');

  /* Get the current game ID and update it */
  const docSnap = await configRef.get();
  configRef.update({ numberGames: docSnap.data()?.numberGames + 1 }).then();

  if (!docSnap.data()) throw new Error('Not sure what happened here...');
  return docSnap.data()?.numberGames;
};

export const generateGameCode = (gameNum: number) => {
  const letters = 'UGTVDWMSYLRKBZIQHPAXNJFEC';
  const numbers = '271645938';
  let code = '';
  code += letters[Math.floor(gameNum) % 25];
  code += numbers[Math.floor(gameNum / 25) % 9];
  code += letters[24 - (Math.floor(gameNum / 225) % 25)];
  code += numbers[Math.floor(gameNum / 5625) % 9];
  return code;
};

export const setGameItems = (gameType: number) => {
  const itemList: GameItem[] = require('./items.json');

  /* Get random items for game from our items list*/
  return itemList.sort(() => 0.5 - Math.random()).slice(0, gameType);
};
