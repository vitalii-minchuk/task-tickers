/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticker, TickerState } from '../../types';

const initialState: TickerState = {
  isConnected: false,
  isStarted: false,
  isLoading: false,
  isBarShown: false,
  fetchError: '',
  tickers: [],
};

const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    getTickers(state) {
      state.isStarted = true;
    },
    getTickersSuccess(state, action: PayloadAction<Ticker[]>) {
      state.tickers = action.payload;
      state.isLoading = false;
    },
    getTickersFailure(state, action: PayloadAction<string>) {
      state.fetchError = action.payload;
      state.isLoading = false;
    },
    showTickersBar(state) {
      state.isBarShown = !state.isBarShown;
    },
  },
});

export const {
  getTickers,
  getTickersSuccess,
  getTickersFailure,
  showTickersBar,
} = tickersSlice.actions;

export default tickersSlice.reducer;
