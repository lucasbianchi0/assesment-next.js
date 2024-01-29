'use client'
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Text,
  Badge,
  HStack,
  Button,
  Progress,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';

export default function PokemonData({ pokemon }) {
  const [catched, setCatched] = useState(false);

  // Maneja la acción de capturar un Pokémon
  const handleClick = async () => {
    try {
      const response = await axios.post(`/api/catched/${pokemon?.id}`, {
        id: pokemon.id,
        name: pokemon.name,
      });

      if (response.status === 200) {
        // Muestra un mensaje de éxito si se captura el Pokémon
        toast.success('¡Pokémon capturado exitosamente!');
        setCatched(true);
      } else if (response.status === 409) {
        // Muestra un mensaje si el Pokémon ya ha sido capturado
        toast.error('¡Este Pokémon ya ha sido capturado!');
      } else {
        // Muestra un mensaje de error en caso de cualquier otro error
        toast.error('Error al capturar el Pokémon');
      }
    } catch (error) {
      // Muestra un mensaje de error si ocurre un error en la solicitud
      toast.error('Error al capturar el Pokémon');
    }
  };

  return (
    <Stack spacing="5" pb="5">
      <Toaster richColors />
      <Stack spacing="5" position="relative">
        {/* Botón para capturar Pokémon */}
        <Box position="absolute" right="0" zIndex="99">
          <Button  colorScheme='green' onClick={handleClick} aria-label={`Catch ${pokemon.name}`}>Catch</Button>
        </Box>
        {/* Imagen del Pokémon */}
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={`Imagen de ${pokemon.name}`} // Agregamos un texto alternativo para la imagen
          />
        </AspectRatio>
        {/* Detalles del Pokémon */}
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm">Peso</Text> {/* Cambiamos "Weight" a "Peso" para mejorar la accesibilidad */}
            <Text>{pokemon?.weight || 'Desconocido'}</Text> {/* Cambiamos "Unknown" a "Desconocido" para mejorar la accesibilidad */}
          </Stack>
          <Stack>
            <Text fontSize="sm">Altura</Text> {/* Cambiamos "Height" a "Altura" para mejorar la accesibilidad */}
            <Text>{pokemon?.height || 'Desconocida'}</Text> {/* Cambiamos "Unknown" a "Desconocida" para mejorar la accesibilidad */}
          </Stack>
          <Stack>
            <Text fontSize="sm">Movimientos</Text>
            <Text>{pokemon.moves ? pokemon.moves.length : 0}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Tipos</Text>
            <HStack wrap="wrap">
              {pokemon?.types.map((type) => (
                <Badge key={type?.slot} colorScheme="green" mb={2}>
                  {type?.type.name}
                </Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      {/* Estadísticas del Pokémon */}
      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        {pokemon?.stats.map((stat) => (
          <Stack key={stat.stat.name}>
            <Text fontSize="xs">{stat.stat.name}</Text>
            <Progress bg="gray.300" borderRadius="full" value={stat.base_stat} colorScheme="green" /> {/* Cambiamos el color del progreso a verde para mejorar la accesibilidad */}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
