import { createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import Reducer from '../Reducer';
import authSaga from '../Saga/Auth';
import itemSaga from '../Saga/List'

const sagamiddleware = createSagaMiddleware()

 const store=createStore(Reducer,applyMiddleware(sagamiddleware,logger))

  sagamiddleware.run(authSaga)
  sagamiddleware.run(itemSaga)
    export default store;