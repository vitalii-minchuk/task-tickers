import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Ticker } from '../../types';

type ISingleTicker = {
  ticker: Ticker;
};

function SingleTicker({ ticker }: ISingleTicker) {
  const [price, setPrice] = useState(0);
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    if (price > +ticker.price) {
      setIsUp(false);
    } else {
      setIsUp(true);
    }
    setPrice(+ticker.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker.price]);
  return (
    <Flex
      w="155px"
      gap="8px"
      color={isUp ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)'}
      fontFamily="Orbitron"
    >
      <Text>{ticker.ticker} :</Text>
      <Text>{ticker.price}</Text>
    </Flex>
  );
}

export default SingleTicker;
