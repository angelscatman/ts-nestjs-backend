<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Section 3 del workspace `ts-nestjs-backend`: API REST de taxonomia construida con [Nest](https://github.com/nestjs/nest) + TypeScript.

El proyecto implementa CRUD con persistencia en MongoDB para:

- `taxonomia` (búsqueda por `taxonNo`, `scientificName` u `ObjectId`)
- `seed` para cargar plantas desde RapidAPI

La aplicación usa `ValidationPipe` global con:

- `whitelist: true`
- `forbidNonWhitelisted: true`

## Project setup

```bash
$ yarn install
```

> Si trabajas desde la raíz del monorepo, también puedes usar:

```bash
$ make install
```

## Compile and run the project

```bash
# desde sections/03-root-directory

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Desde la raíz del monorepo:

```bash
$ make dev-03
```

La API levanta por defecto en:

```text
http://localhost:3000/api
```

## Configuración de MongoDB

Antes de levantar la app, asegúrate de:

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Levantar MongoDB con Docker:
```bash
docker compose up -d
```

La API se conecta a `mongodb://localhost:27017/nest-plants`

## Seed de datos

Para cargar plantas desde RapidAPI, ejecuta:

```bash
GET /api/seed/plants
```

Ejemplo con `curl`:

```bash
curl http://localhost:3000/api/seed/plants
```

Respuesta esperada:

```json
{
  "source": "https://house-plants2.p.rapidapi.com/all-lite",
  "fetched": 1000,
  "mapped": 950,
  "message": "Seed completed. 950 plants inserted into taxonomia BD."
}
```

> Nota: Requiere `RAPIDAPI_KEY` en `.env`. Obtén tu clave en [RapidAPI - House Plants 2](https://rapidapi.com/mnai01/api/house-plants2)

## Endpoints principales

### Taxonomia

- `GET /api/taxonomia` → lista registros
- `GET /api/taxonomia/:param` → obtiene por `taxonNo`, `ObjectId` o `scientificName`
- `POST /api/taxonomia` → crea un registro
- `PATCH /api/taxonomia/:param` → actualiza un registro
- `DELETE /api/taxonomia/:id` → elimina por `ObjectId`

Body ejemplo para `POST /api/taxonomia`:

```json
{
  "scientificName": "Rosa eglanteria",
  "taxonNo": 1024,
  "autorship": "L.",
  "commonNames": [
    { "name": "Rosa mosqueta", "language": "es" }
    { "name": "Sweet brier", "language": "en" }
  ],
  "imgUrl": "https://example.com/image.jpg"
}
```

Body ejemplo para `PATCH /api/taxonomia/:param`:

```json
{
  "scientificName": "Rosa canina",
  "commonNames": [
    { "name": "Rosal silvestre", "language": "es" }
  ]
}
```

## Estructura del módulo

- `src/taxonomia`: controlador, servicio, DTOs y entidad de taxonomia.
- `src/seed`: controlador y servicio para cargar plantas desde RapidAPI.
- `src/common`: módulo compartido con manejo de excepciones y adapters HTTP.
- `src/app.module.ts`: importa `TaxonomiaModule`, `SeedModule` y `MongooseModule`.
- `public/`: recursos estáticos servidos por Nest.

## Flujo recomendado de uso

1. Levanta MongoDB con `docker compose up -d`.
2. Levanta la API con `yarn start:dev`.
3. Carga plantas con `curl http://localhost:3000/api/seed/plants`.
4. Prueba `GET /api/taxonomia` y `GET /api/taxonomia/:param` (por `taxonNo`, `scientificName` u `ObjectId`).
5. Experimenta con `POST`, `PATCH` y `DELETE`.

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

- Author - [Angel Scatman](https://github.com/angelscatman)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
