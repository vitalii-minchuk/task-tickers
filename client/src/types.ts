export type Ticker = {
  last_trade_time: string;
  ticker: keyof typeof ChosenTickers;
  price: string;
};

export enum ChosenTickers {
  AAPL = 'AAPL',
  GOOGL = 'GOOGL',
  MSFT = 'MSFT',
  AMZN = 'AMZN',
  FB = 'FB',
  TSLA = 'TSLA',
}

export type TickerState = {
  isStarted: boolean;
  isConnected: boolean;
  isLoading: boolean;
  isBarShown: boolean;
  fetchError: string;
  tickers: Ticker[];
};
