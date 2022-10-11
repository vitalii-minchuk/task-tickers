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
        <Flex
          h={{ base: '50px', sm: '70px' }}
          align="center"
          justify="space-between"
        >
          <Heading
            as="h1"
            fontFamily="Orbitron"
            fontSize={{ base: 'xl', sm: '3xl' }}
          >
            task-tickers
          </Heading>
          <Flex as="nav" gap={{ base: '10px', sm: '30px' }}>
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
