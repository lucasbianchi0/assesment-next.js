'use client'
import { Stack, Text, Image, HStack, Badge, AspectRatio, Button, Box } from "@chakra-ui/react";

export default function PokemonCard({ pokemon, onDelete }) {
  // Verificar si el objeto pokemon está definido
  if (!pokemon) {
    return null; // Devolver null si pokemon no está definido
  }

  // Función para manejar el clic del botón de eliminar
  const handleDelete = () => {
    if (onDelete) {
      onDelete(); // Llamar a la función onDelete si está definida
    }
  };

  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center"
    >
      {/* Imagen del Pokémon */}
      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt={`Imagen de ${pokemon.name}`}
        />
      </AspectRatio>

      {/* Nombre del Pokémon */}
      <Text textAlign="center" textTransform="capitalize">
        {pokemon.name}
      </Text>

      {/* Tipos del Pokémon */}
      <HStack >
        {pokemon.types?.map((type) => (
          <Badge colorScheme="green" size="md" key={type.slot} px={3} py={1} rounded="full">
            {type.type.name}
          </Badge>
        ))}
      </HStack>

      {/* Botón de eliminar */}
      {onDelete && (
        <Box textAlign="center" w="100%">
          <Button colorScheme="red" size="sm" onClick={handleDelete} aria-label={`Eliminar ${pokemon.name}`}>
            Release
          </Button>
        </Box>
      )}
    </Stack>
  );
}
