import {
  Box,
  Container,
  Flex,
  FormControl,
  Heading,
  Switch,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../hooks';
import { showTickersBar } from '../../store/Slices/tickersSlice';
import NavLink from '../common/NavLink';

function Header() {
  const dispatch = useAppDispatch();
  const showTickersBarHandler = () => {
    dispatch(showTickersBar());
  };
  return (
    <header>
      <Container maxW="6xl">
        <Flex align="center" justify="space-between">
          <Heading as="h1" fontSize={{ base: 'xl', sm: '3xl' }}>
            task-tickers
          </Heading>
          <Flex as="nav" gap="30px">
            <NavLink to="">Home</NavLink>
            <NavLink to="settings">Settings</NavLink>
          </Flex>
          <Box>
            <FormControl display="flex" alignItems="center">
              <Switch
                onChange={showTickersBarHandler}
                size="sm"
                colorScheme="teal"
              />
            </FormControl>
          </Box>
        </Flex>
      </Container>
    </header>
  );
}

export default Header;
