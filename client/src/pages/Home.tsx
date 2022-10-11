import { Box, Container } from '@chakra-ui/react';
import TickersChart from '../components/TickersChart';

function Home() {
  return (
    <Box as="section">
      <Container maxW="6xl">
        <Box mt="30px">
          <TickersChart />
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
