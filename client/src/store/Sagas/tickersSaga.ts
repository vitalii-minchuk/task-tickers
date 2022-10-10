import { call, put, take, takeEvery } from '@redux-saga/core/effects';
import { io, Socket } from 'socket.io-client';
import { END, EventChannel, eventChannel } from '@redux-saga/core';
import { getTickers, getTickersSuccess } from '../Slices/tickersSlice';
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

export function* getTickersSaga() {
  yield socket.connect();
  yield socket.emit('start');
  const chan: EventChannel<Ticker[]> = yield call(createChannel, socket);
  while (true) {
    const value: Ticker[] = yield take(chan);
    yield put(getTickersSuccess(value));
  }
}

export function* rootTickersSaga() {
  yield takeEvery(getTickers.type, getTickersSaga);
}
