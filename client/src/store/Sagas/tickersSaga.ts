import { call, put, select, take, takeEvery } from '@redux-saga/core/effects';
import { io, Socket } from 'socket.io-client';
import { END, EventChannel, eventChannel } from '@redux-saga/core';
import {
  changeInterval,
  closeConnection,
  createConnection,
  getTickers,
  getTickersSuccess,
} from '../Slices/tickersSlice';
import { Ticker } from '../../types';

const createChannel = (socket: Socket) => {
  return eventChannel((emitter) => {
    socket.on('ticker', (data) => {
      emitter(data);
    });
    return () => {
      emitter(END);
    };
  });
};
const socket = io('http://localhost:4000');

export function* createConnectionSaga() {
  yield socket.connect();
}

export function* closeConnectionSaga() {
  yield socket.disconnect();
}

export function* getTickersSaga() {
  const interval: number = yield select((store) => store.tickers.interval);
  yield socket.connect();
  yield socket.emit('start', interval);
  const chan: EventChannel<Ticker[]> = yield call(createChannel, socket);
  while (true) {
    const value: Ticker[] = yield take(chan);
    yield put(getTickersSuccess(value));
  }
}

export function* changeIntervalSaga() {
  const interval: number = yield select((store) => store.tickers.interval);
  yield socket.emit('interval', interval);
}

export function* rootTickersSaga() {
  yield takeEvery(getTickers.type, getTickersSaga);
  yield takeEvery(closeConnection.type, closeConnectionSaga);
  yield takeEvery(changeInterval.type, changeIntervalSaga);
  yield takeEvery(createConnection.type, createConnectionSaga);
}
