import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import fbConfig from '../../config/firebaseConfig';
import { rootReducer } from '../reducers';

const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore })),
      reduxFirestore(fbConfig)
    )
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
