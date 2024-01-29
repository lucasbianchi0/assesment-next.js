'use client'
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Stack,
  Input,
  Button,
  SimpleGrid,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  VisuallyHidden,
} from "@chakra-ui/react";
import PokemonCard from "@/components/PokemonCard";
import PokemonData from "@/components/PokemonData";
import Nav from "@/components/Nav";

export default function Home() {
  const pokemonDataModal = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    axios.get(currentPage)
      .then(async ({ data }) => {
        try {
          const promises = data.results.map((result) => axios(result.url));
          const fetchedPokemon = (await Promise.all(promises)).map(
            (res) => res.data
          );
          setPokemon((prev) => [...prev, ...fetchedPokemon]);
        } catch (error) {
          setError("Error fetching Pokemon data");
        } finally {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError("Error fetching Pokemon data");
        setIsLoading(false);
      });
  }, [currentPage]);
   

  function handleNextPage() {
    const nextOffset = Number(currentPage.match(/offset=(\d+)/)[1]) + 20;
    setCurrentPage(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${nextOffset}`);
  }

  function handleViewPokemon(pokemon) {
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  }

  return (
    <>
      <Head>
        <title>Pokemon Challenge - Home</title>
        <meta
          name="description"
          content="Welcome to the Pokemon Challenge! Catch your favorite Pokemon and become the ultimate Pokemon Trainer."
        />
        <meta
          name="keywords"
          content="Pokemon, Challenge, Catch, Game"
        />
        <meta name="author" content="Lucas bianchi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
        <Stack p="5" alignItems="center" spacing="5" role="main">
          <Text as="h1" fontSize="4xl" fontWeight="bold" mb="4" textAlign="center" >
            Catch your Pokemon!
          </Text>
          {error && (
            <Box role="alert" w="100%" mb="4">
              <VisuallyHidden>Error:</VisuallyHidden>
              <Text fontSize="lg" color="red.500">
                {error}
              </Text>
            </Box>
          )}
          {isLoading && (
            <Flex justify="center" role="status">
              <Spinner size="xl" />
            </Flex>
          )}

          <SimpleGrid role="grid" spacing="5" columns={{ base: 1, md: 5 }}>
            {pokemon.map((pokemon) => (
              <Box
                key={pokemon.id}
                as="button"
                role="gridcell"
                onClick={() => handleViewPokemon(pokemon)}
              >
                <PokemonCard pokemon={pokemon} />
              </Box>
            ))}
          </SimpleGrid>

          <Button
            isLoading={isLoading}
            onClick={handleNextPage}
            mt="4"
            display={!isLoading && pokemon.length > 0 ? "block" : "none"}
            colorScheme="green"
          >
            Load More
          </Button>
        </Stack>;
        </Container>
      </Flex>

      <Modal {...pokemonDataModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform="capitalize">
            {selectedPokemon?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemon && <PokemonData pokemon={selectedPokemon} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
