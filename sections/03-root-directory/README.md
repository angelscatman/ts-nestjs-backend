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

El proyecto actualmente implementa:

- Módulo `taxonomia` con persistencia en MongoDB (Mongoose)
- Prefijo global `api` para los endpoints
- `ValidationPipe` global con `whitelist: true` y `forbidNonWhitelisted: true`
- Servido de archivos estáticos desde `public/`
- Scripts de Tailwind CSS para compilar estilos

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

Para compilar CSS de Tailwind:

```bash
# build una vez
$ yarn run build:css

# watch mode
$ yarn run start:css
```

La API levanta por defecto en:

```text
http://localhost:3000
```

Con prefijo global:

```text
http://localhost:3000/api
```

## MongoDB local (Docker)

La aplicación se conecta a MongoDB en:

```text
mongodb://localhost:27017/nest-plants
```

Para levantar MongoDB local desde `sections/03-root-directory`:

```bash
docker compose up -d
```

Para detenerlo:

```bash
docker compose down
```

## Endpoints principales

### Taxonomia

- `GET /api/taxonomia` → lista registros (actualmente placeholder)
- `GET /api/taxonomia/:param` → obtiene un registro por `taxonNo`, `ObjectId` o `scientificName`
- `POST /api/taxonomia` → crea un registro
- `PATCH /api/taxonomia/:param` → actualiza un registro
- `DELETE /api/taxonomia/:id` → elimina un registro por `ObjectId` valido

Body ejemplo para `POST /api/taxonomia`:

```json
{
  "scientificName": "Rosa eglanteria",
  "taxonNo": 1024,
  "autorship": "L.",
  "commonNames": [
    { "name": "Mosqueta", "language": "es" },
    { "name": "Sweet brier", "language": "en" }
  ]
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

Notas importantes:

- `scientificName` se guarda en minusculas internamente.
- `DELETE` usa `ParseMongoIdPipe`; si el id no es `ObjectId` valido, responde `400`.
- `findAll()` aun no consulta Mongo y responde un mensaje de placeholder.

## Estructura del módulo

- `src/taxonomia`: controlador, servicio, DTOs y entidad/schema de `taxonomia`.
- `src/common`: modulo compartido, `ExceptionHandlerService` y pipes reutilizables.
- `src/common/pipes/parse-mongo-id/parse-mongo-id.pipe.ts`: validacion de `ObjectId` en parametros.
- `src/app.module.ts`: importa `TaxonomiaModule`, `ServeStaticModule` y `MongooseModule.forRoot(...)`.
- `src/main.ts`: define `ValidationPipe` global y prefijo `api`.
- `public/`: recursos estaticos servidos por Nest.

## Flujo recomendado de uso

1. Levanta MongoDB con `docker compose up -d`.
2. Levanta la API con `yarn start:dev`.
3. Crea un registro con `POST /api/taxonomia`.
4. Consultalo con `GET /api/taxonomia/:param` usando `taxonNo`, `scientificName` u `ObjectId`.
5. Prueba `PATCH /api/taxonomia/:param` y `DELETE /api/taxonomia/:id`.
6. Opcional: ejecuta `yarn start:css` si estas iterando estilos en `public/css/`.

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
