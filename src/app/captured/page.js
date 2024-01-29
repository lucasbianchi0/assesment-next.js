'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Spinner, Text, SimpleGrid, Stack } from '@chakra-ui/react';
import PokemonCard from '@/components/PokemonCard';
import Head from 'next/head';

const CapturedPokemons = () => {
  const [capturedPokemon, setCapturedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapturedPokemon = async () => {
      try {
        const response = await axios.get('/api/capturedPokemons', { next: { revalidate: 10 } });
        setCapturedPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching captured Pokémon:', error);
        setLoading(false);
      }
    };

    fetchCapturedPokemon();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/catched/${id}`, { next: { revalidate: 10 } });
      setCapturedPokemon((prevPokemon) => prevPokemon.filter((pokemon) => pokemon.id !== id));
    } catch (error) {
      console.error('Error deleting Pokémon:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Captured Pokemons - My Pokemon Collection</title>
        <meta name="description" content="Explore your captured Pokemons in My Pokemon Collection." />
      </Head>
      <main>
        {loading ? (
          <Flex align="center" justify="center" h="100vh">
            <Spinner size="lg" />
          </Flex>
        ) : capturedPokemon.length === 0 ? (
          <Flex align="start" justify="center" h="100vh" marginTop={12}>
            <Text fontSize="2xl" >No captured pokemons</Text>
          </Flex>
        ) : (
          <Box p={4}>
            <Stack spacing="5" align="center">
              <Text fontSize="4xl" fontWeight="bold" mb="4" textAlign="center">
                Captured Pokemons
              </Text>
              <SimpleGrid columns={{ base: 1, md: 5 }} spacing="5">
                {capturedPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onDelete={() => handleDelete(pokemon.id)}
                    alt={`Image of ${pokemon.name}`} 
                  />
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )}
      </main>
    </>
  );
};

export default CapturedPokemons;
