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

Section 3 del workspace `ts-nestjs-backend`: API REST construida con [Nest](https://github.com/nestjs/nest) + TypeScript.

El proyecto actualmente implementa:

- Módulo `taxonomia` (CRUD generado con Nest CLI)
- Prefijo global `api` para los endpoints
- Servido de archivos estáticos desde `public/`

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
http://localhost:3000
```

Con prefijo global:

```text
http://localhost:3000/api
```

## Docker (MongoDB local)

En esta sección tienes un `docker-compose.yaml` para levantar MongoDB local:

```bash
docker compose up -d
```

> Nota: el contenedor de Mongo está disponible, pero el proyecto aún no tiene integración activa con Mongoose/Mongo en código.

## Endpoints principales

### Taxonomia

- `GET /api/taxonomia` → lista registros (placeholder)
- `GET /api/taxonomia/:id` → obtiene un registro por id numérico
- `POST /api/taxonomia` → crea un registro
- `PATCH /api/taxonomia/:id` → actualiza un registro
- `DELETE /api/taxonomia/:id` → elimina un registro

> Actualmente el servicio `taxonomia` devuelve respuestas de ejemplo (scaffold inicial) y no persiste datos.

## Estructura del módulo

- `src/taxonomia`: controlador, servicio, DTOs y entidad de `taxonomia`.
- `src/app.module.ts`: importa `TaxonomiaModule` y `ServeStaticModule`.
- `src/main.ts`: define el prefijo global `api`.
- `public/`: recursos estáticos servidos por Nest.

## Flujo recomendado de uso

1. Levanta la API con `yarn start:dev`.
2. Prueba `GET /api/taxonomia`.
3. Prueba operaciones `POST`, `PATCH` y `DELETE`.
4. Si vas a integrar persistencia luego, levanta Mongo con `docker compose up -d`.

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
