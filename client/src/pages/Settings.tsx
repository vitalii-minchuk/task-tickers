import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addShownTicker,
  changeInterval,
  closeConnection,
  getTickers,
  removeShownTicker,
} from '../store/Slices/tickersSlice';
import { ChosenTickers } from '../types';
import getNumberFromIntervalValue from '../utils/helpers';

function Settings() {
  const { isStarted, chosenTickers, tickers } = useAppSelector(
    (state) => state.tickers
  );
  const dispatch = useAppDispatch();

  const handleStart = () => {
    dispatch(getTickers());
  };

  const handleStop = () => {
    dispatch(closeConnection());
  };

  const handleChangeInterval = (value: string) => {
    const interval = getNumberFromIntervalValue(value);
    dispatch(changeInterval(interval));
  };

  const handleShowTickers = (e: ChangeEvent<HTMLInputElement>) => {
    if (chosenTickers.find((el) => el === e.target.value)) {
      dispatch(removeShownTicker(e.target.value as keyof typeof ChosenTickers));
    } else {
      dispatch(addShownTicker(e.target.value as keyof typeof ChosenTickers));
    }
  };
  return (
    <Box w="full" as="section">
      <Container maxW="6xl">
        <Flex mt="30px" direction="column" align="center" gap="30px">
          <Box>
            {isStarted ? (
              <Button onClick={handleStop}>stop</Button>
            ) : (
              <Button onClick={handleStart}>start</Button>
            )}
          </Box>
          <RadioGroup
            onChange={(value) => handleChangeInterval(value)}
            defaultValue="5s"
            margin="0 auto"
            w={{ base: '300px', sm: '380px' }}
          >
            <Flex align="center" justify="center" gap="10px">
              <Text fontWeight="bold">Update data every:</Text>
              <Radio value="1s">1s</Radio>
              <Radio value="2s">2s</Radio>
              <Radio value="5s">5s</Radio>
            </Flex>
          </RadioGroup>
          {!!tickers.length && (
            <CheckboxGroup
              defaultValue={Object.values(ChosenTickers).filter((el) =>
                chosenTickers.includes(el)
              )}
            >
              <Flex direction="column">
                {Object.keys(ChosenTickers).map((el) => (
                  <Checkbox onChange={handleShowTickers} key={el} value={el}>
                    {el}
                  </Checkbox>
                ))}
              </Flex>
            </CheckboxGroup>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default Settings;
