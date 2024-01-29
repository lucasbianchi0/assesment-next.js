Revisar al final el relevamiento de lo realizado
# Pokémon Test

El objetivo de la app es listar todos los Pokémon y mostrar información de los mismos al clickear sobre ellos. También la app mostrará de alguna forma los Pokémon que el usuario tiene capturados.

## Comenzando

Correr servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Objetivos

- Limpiar el proyecto template y detectar errores o mejoras.
- Optimizar la app en cuanto accesibilidad.
- Integrar la API interna para mostar que Pokémon tiene capturados el usuario.
- Terminar de integrar la API de [PokeApi](https://pokeapi.co/docs/v2#info) para que la app cumpla con todo lo que pide el enunciado.
- Hacer mejoras de UX / UI que considere pertinentes.
- Optimizar diseño responsive.

### Anotaciones

- Cualquier mejora no especificada previamente será valorada.
- Ante una duda con el enunciado, tomar una decisión y resolver como crea pertinente.
- Si tiene problemas con la base de datos interna puede renombrar el archivo `db-example.json` a `db.json` para comenzar de 0.

### Documentación útil

- [Next.JS](https://nextjs.org/docs)
- [Chakra UI](https://chakra-ui.com/getting-started)
- [PokeAPI](https://pokeapi.co/docs/v2#info)
- [Axios](https://axios-http.com/es/docs/intro)

## API Pokémon atrapados

### Obtener todos los Pokémon atrapados.

#### Request

`GET /api/catched`

#### Response

```json
[
  {
    "id": 1,
    "name": "bulbasaur"
  },
  {
    "id": 2,
    "name": "venasaur"
  }
]
```

### Atrapar un Pokémon.

#### Request

`POST /api/catched`

#### Body

```json
{
  "id": 1,
  "name": "bulbasaur"
}
```

#### Reponse

```json
{
  "id": 1,
  "name": "bulbasaur"
}
```

### Eliminar un Pokémon atrapado.

#### Request

`DELETE /api/catched/{pokemonId}`

#### Reponse

`HTTP STATUS 200`


Trabajo Realizado


Migración y actualización:
- Actualización de la configuración a Next 14 para aprovechar las nuevas características.
- Implementación de Million para mejorar el rendimiento de la página.

Componentes dinámicos y validaciones:
- Actualización a componentes dinámicos con validaciones para garantizar la integridad de los datos.

Enlaces Next.js:
- Uso de enlaces internos de Next.js para una navegación fluida y eficiente.

Revalidación y manejo de errores:
- Configuración de revalidación automática de datos para mantener la información actualizada.
- Manejo efectivo de errores y excepciones para una experiencia de usuario sin contratiempos.

Uso de server actions dinámicos:
- Empleo de acciones del servidor de forma dinámica para mejorar la comunicación entre cliente y servidor.

APIs REST GET - POST - DELETE:
- Desarrollo y consumo de APIs REST para operaciones de lectura, creación y eliminación de recursos.

SEO y contenido semántico:
- Optimización del contenido para mejorar el posicionamiento en motores de búsqueda.
- Utilización de elementos semánticos en la estructura HTML para una mejor comprensión por parte de los motores de búsqueda y lectores de pantalla.

Accesibilidad:
- Mejora de la accesibilidad de las imágenes con atributos alt descriptivos y contrastes de colores adecuados.

Diseño responsive:
- Implementación de un diseño responsive que garantiza una experiencia consistente en diferentes dispositivos y tamaños de pantalla.
- Adecuación del diseño para una experiencia de usuario óptima en dispositivos móviles y de escritorio.

Documentación interna en todo el código:
- Se agregaron comentarios explicativos en todo el código para facilitar su comprensión y mantenimiento.
