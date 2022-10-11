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
    // const data = chartData?.map((el) => el.map((ticker) => ticker.price));
    // const label = chartData?.map((el) => el.map((ticker) => ticker.ticker));
    const labels = chartData?.map((el) =>
      dayjs(el[0]?.last_trade_time).format('HH:mm:ss')
    );
    return labels;
  };

  const getCartData = () => {
    const result: any = [];
    const label = Object.values(ChosenTickers).filter((el) =>
      chosenTickers.includes(el)
    );
    const getPriceData = (ticker: string) => {
      const res: Array<number> = [];
      chartData.forEach((el) => {
        const obj = el.find((item) => item.ticker === ticker);
        res.push(+obj?.price);
      });
      return res;
    };
    label.forEach((el) => {
      result.push({
        label: el,
        data: getPriceData(el),
      });
    });
    console.log(result);
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
