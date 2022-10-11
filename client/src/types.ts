export type Ticker = {
  last_trade_time: string;
  ticker: keyof typeof ChosenTickers;
  price: string;
  change: string;
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
  chosenTickers: Array<keyof typeof ChosenTickers>;
  interval: number;
  isStarted: boolean;
  isConnected: boolean;
  isBarShown: boolean;
  fetchError: string;
  tickers: Ticker[];
};
