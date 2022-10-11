/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChosenTickers, Ticker, TickerState } from '../../types';

const initialState: TickerState = {
  chosenTickers: [ChosenTickers.AAPL, ChosenTickers.AMZN, ChosenTickers.TSLA],
  interval: 5000,
  isConnected: false,
  isStarted: false,
  isBarShown: false,
  fetchError: '',
  tickers: [],
};

const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    createConnection(state) {
      state.isConnected = true;
    },
    closeConnection(state) {
      state.isStarted = false;
    },
    changeInterval(state, action: PayloadAction<number>) {
      state.interval = action.payload;
    },
    getTickers(state) {
      state.isStarted = true;
    },
    getTickersSuccess(state, action: PayloadAction<Ticker[]>) {
      state.tickers = action.payload;
    },
    getTickersFailure(state, action: PayloadAction<string>) {
      state.fetchError = action.payload;
    },
    showTickersBar(state) {
      state.isBarShown = !state.isBarShown;
    },
    addShownTicker(state, action: PayloadAction<keyof typeof ChosenTickers>) {
      state.chosenTickers.push(action.payload);
    },
    removeShownTicker(
      state,
      action: PayloadAction<keyof typeof ChosenTickers>
    ) {
      state.chosenTickers = state.chosenTickers.filter(
        (el) => el !== action.payload
      );
    },
  },
});

export const {
  getTickers,
  getTickersSuccess,
  getTickersFailure,
  showTickersBar,
  createConnection,
  closeConnection,
  changeInterval,
  removeShownTicker,
  addShownTicker,
} = tickersSlice.actions;

export default tickersSlice.reducer;
