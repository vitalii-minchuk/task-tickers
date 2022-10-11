import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChosenTickers, Ticker } from '../../types';
import { useAppSelector } from '../../hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TickersChart() {
  const [chartData, setChartData] = useState<Array<Ticker[]>>([]);
  const { tickers, chosenTickers } = useAppSelector((state) => state.tickers);
  const shownTickers = tickers.filter((ticker) =>
    chosenTickers.includes(ticker.ticker)
  );

  useEffect(() => {
    setChartData((prev) => [...prev, shownTickers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickers]);

  const getChartLabels = () => {
    const labels = chartData?.map((el) =>
      dayjs(el[0]?.last_trade_time).format('HH:mm:ss')
    );
    return labels;
  };

  const getCartData = () => {
    const result: ChartDataset<'line'>[] = [];
    const label = Object.values(ChosenTickers).filter((el) =>
      chosenTickers.includes(el)
    );

    const getPriceData = (ticker: string) => {
      const res: Array<number> = [];
      chartData.forEach((el) => {
        const obj = el.find((item) => item.ticker === ticker);
        if (obj?.price) {
          res.push(+obj.price);
        }
      });
      return res;
    };

    const getBGColor = (item: keyof typeof ChosenTickers) => {
      switch (item) {
        case ChosenTickers.AAPL:
          return 'green';
        case ChosenTickers.AMZN:
          return 'blue';
        case ChosenTickers.FB:
          return 'orange';
        case ChosenTickers.GOOGL:
          return 'black';
        case ChosenTickers.MSFT:
          return 'red';
        case ChosenTickers.TSLA:
          return 'yellow';

        default:
          return 'gray';
      }
    };

    label.forEach((el) => {
      result.push({
        label: el,
        data: getPriceData(el),
        borderColor: getBGColor(el),
      });
    });

    return result;
  };
  return (
    <Line
      data={{
        labels: getChartLabels(),
        datasets: getCartData(),
      }}
      options={{
        responsive: true,
      }}
    />
  );
}

export default TickersChart;
