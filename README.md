<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Curso práctico backend con <a href="http://nodejs.org" target="_blank">Node.js</a>, TypeScript y NestJS para aprender arquitectura y APIs REST paso a paso.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

`ts-nestjs-backend` es un workspace de curso para entender backend con NestJS desde fundamentos hasta una API REST modular.

Este repositorio está organizado por secciones:

- **Section 01 - Intro TypeScript**: fundamentos de TypeScript y ejercicios base.
- **Section 02 - Car Dealership (NestJS)**: API REST con módulos, controladores, servicios, DTOs, validación y seed en memoria.

## Project setup

```bash
# desde la raíz del repo
$ make install

# alternativa
$ yarn install
```

Requisito opcional para generar recursos Nest:

```bash
$ npm i -g @nestjs/cli
```

## Compile and run the project

```bash
# section 01
$ make dev-01

# section 02 (NestJS)
$ make dev-02
```

Para section 02, la API corre por defecto en:

```text
http://localhost:3000
```

## Seed (section 02)

Con `make dev-02` ejecutándose, carga datos de prueba:

```bash
$ curl http://localhost:3000/seed
```

Respuesta esperada:

```text
Insertion of data completed successfully!
```

Luego prueba:

- `GET /cars`
- `GET /brands`

> Nota: en section 02 la persistencia es en memoria; al reiniciar la app se reinician los datos.

## Run tests

```bash
# tests de section 02
$ cd sections/02-car-dealership
$ yarn test
$ yarn test:e2e
$ yarn test:cov
```

## Resources

- Section 01: `sections/01-intro-typescript`
- Section 02: `sections/02-car-dealership`
- Comandos del workspace: `make help`
- Curso base de referencia: [Udemy - Nest: Desarrollo backend escalable con Node](https://www.udemy.com/course/nest-framework/), por Fernando Herrera.
- Documentación NestJS: https://docs.nestjs.com

## Objetivos del curso

Se espera:

- El despliegue de backends en la red.
- Comunicación en tiempo real con WebSockets (WS).
- Crear autenticación y autorización.
- Core building blocks personalizados.
- Dockerización de la aplicación.
- Crear múltiples APIs RESTful.
- Carga de archivos.
- Dominar TypeScript.
- Entidades y esquemas para bases de datos relacionales y no relacionales.

## Autor

- [Angel Scatman](https://github.com/angelscatman)
