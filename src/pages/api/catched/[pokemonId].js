import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  // Crear una instancia de la base de datos JSON
  const db = new JsonDB(new Config("db", true, false, "/"));

  // Manejar la solicitud GET para obtener detalles de un Pokémon
  if (req.method === "GET") {
    const query = req.query;
    const { pokemonId } = query;

    // Obtener todos los Pokémon de la base de datos
    const data = await db.getData(`/catchedPokemon`);
    // Buscar y devolver el Pokémon correspondiente al ID proporcionado
    return res.status(200).json(data.find((pokemon) => pokemon.id === Number(pokemonId)));
  } 
  // Manejar la solicitud POST para capturar un nuevo Pokémon
  else if (req.method === "POST") {
    try {
      const { id, name } = req.body;
      console.log(id, name);
  
      // Obtener todos los Pokémon capturados de la base de datos
      const allPokemon = await db.getData(`/catchedPokemon`);
  
      // Verificar si el nuevo Pokémon ya existe en la base de datos
      const existingPokemon = allPokemon.find(pokemon => pokemon.id === id);
      if (existingPokemon) {
        console.log('El Pokémon ya ha sido capturado');
        return res.status(409).send("El Pokémon ya ha sido capturado.");
      }
  
      // Si el Pokémon no existe, crear un nuevo objeto de Pokémon
      const newPokemon = {
        id,
        name,
      };
  
      // Agregar el nuevo Pokémon a la base de datos
      db.push(`/catchedPokemon[]`, newPokemon);
  
      console.log('¡Pokémon capturado exitosamente!', newPokemon);
      return res.status(200).json(newPokemon);
    } catch (error) {
      console.error("Error al capturar el Pokémon:", error);
      return res.status(500).send("Error interno del servidor.");
    }
  }
  // Manejar la solicitud DELETE para liberar un Pokémon capturado
  else if (req.method === "DELETE") {
    try {
      const query = req.query;
      const { pokemonId } = query;

      // Eliminar el Pokémon correspondiente al ID proporcionado de la base de datos
      await db.delete(
        "/catchedPokemon[" +
          (await db.getIndex("/catchedPokemon", Number(pokemonId))) +
          "]"
      );

      return res.status(200).send("Pokemon liberado");
    } catch {
      return res.status(409).send("Pokemon no encontrado");
    }
  }
  // Manejar solicitudes no permitidas
  return res.status(405).send("Method not allowed.");
}
