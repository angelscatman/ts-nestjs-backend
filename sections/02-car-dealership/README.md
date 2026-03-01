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

Section 2 del workspace `ts-nestjs-backend`: API REST de concesionaria construida con [Nest](https://github.com/nestjs/nest) + TypeScript.

El proyecto implementa CRUD en memoria para:

- `cars`
- `brands`
- `seed` para cargar datos iniciales

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
# desde sections/02-car-dealership

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Desde la raíz del monorepo:

```bash
$ make dev-02
```

La API levanta por defecto en:

```text
http://localhost:3000
```

## Seed de datos

Para cargar datos de prueba en memoria, ejecuta:

```bash
GET /seed
```

Ejemplo con `curl`:

```bash
curl http://localhost:3000/seed
```

Respuesta esperada:

```text
Insertion of data completed successfully!
```

Los datos seed están en:

- `src/seed/data/brands.seed.ts`
- `src/seed/data/cars.seed.ts`

> Nota: la persistencia es en memoria; al reiniciar la app se pierden los datos cargados.

## Endpoints principales

### Cars

- `GET /cars` → lista todos los autos
- `GET /cars/:id` → obtiene un auto por UUID v4
- `POST /cars` → crea un auto
- `PATCH /cars/:id` → actualiza un auto
- `DELETE /cars/:id` → elimina un auto

Body ejemplo para `POST /cars`:

```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2020
}
```

### Brands

- `GET /brands` → lista todas las marcas
- `GET /brands/:id` → obtiene una marca por UUID v4
- `POST /brands` → crea una marca
- `PATCH /brands/:id` → actualiza una marca
- `DELETE /brands/:id` → elimina una marca

Body ejemplo para `POST /brands`:

```json
{
  "name": "Toyota"
}
```

## Estructura del módulo

- `src/cars`: controlador, servicio, DTOs e interfaz de autos.
- `src/brands`: controlador, servicio, DTOs y entidad de marcas.
- `src/seed`: endpoint y servicio para inyectar data semilla en `cars` y `brands`.
- `src/app.module.ts`: importa `CarsModule`, `BrandsModule` y `SeedModule`.

## Flujo recomendado de uso

1. Levanta la API con `yarn start:dev`.
2. Ejecuta `GET /seed` para cargar marcas y autos de prueba.
3. Consulta `GET /cars` y `GET /brands`.
4. Prueba operaciones `POST`, `PATCH` y `DELETE`.

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