import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  try {
    // Inicializa la base de datos JSON
    const db = new JsonDB(new Config("db", true, false, "/"));
    console.log("Base de datos inicializada correctamente.");

    if (req.method === "GET") {
      try {
        // Verifica la ruta de acceso a los datos en la base de datos
        const path = "/catchedPokemon"; // Ruta de acceso a los Pokémon capturados
        console.log("Ruta de acceso a los datos en la base de datos:", path);

        // Obtén todos los Pokémon capturados desde la base de datos
        const data = await db.getData(path); // Corrección de la ruta
        console.log("Datos de los Pokémon capturados obtenidos:", data);

        // Devuelve los datos como una respuesta JSON
        return res.status(200).json(data);
      } catch (error) {
        // Maneja cualquier error que ocurra al obtener los datos
        console.error("Error al obtener los Pokémon capturados:", error);
        return res.status(500).send("Error interno del servidor.");
      }
    } else {
      // Devuelve un error si se recibe un método de solicitud no permitido
      return res.status(405).send("Método no permitido.");
    }
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    return res.status(500).send("Error interno del servidor.");
  }
}
