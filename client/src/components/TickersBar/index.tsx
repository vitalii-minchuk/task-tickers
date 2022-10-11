import { Box, Flex, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import Marquee from 'react-fast-marquee';
import { useAppSelector } from '../../hooks';
import SingleTicker from './SingleTicker';

function TickersBar() {
  const { isBarShown, tickers, chosenTickers } = useAppSelector(
    (state) => state.tickers
  );
  const shownTickers = tickers.filter((ticker) =>
    chosenTickers.includes(ticker.ticker)
  );

  return (
    <Box bg="black" height="40px">
      {isBarShown && (
        <Marquee gradientWidth="15%" gradientColor={[15, 15, 15]} speed={120}>
          <Flex mx="30px" align="center" height="40px" gap="30px">
            {!!tickers.length && (
              <Text textColor="white" fontFamily="Orbitron">
                {dayjs(tickers[0].last_trade_time).format('DD/MM/YY  HH:mm:ss')}
              </Text>
            )}
            {shownTickers?.map((el) => (
              <SingleTicker key={el.ticker} ticker={el} />
            ))}
          </Flex>
        </Marquee>
      )}
    </Box>
  );
}

export default TickersBar;
