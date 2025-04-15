<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en Dev

1. Clonar el proyecto
2. Instalar dependencias `npm install`
4. Clonar `env.template` y renombrar a `.env`
5. Levantar la base de datos `docker compose up -d`
6. Generar el Prisma client `npx prisma generate`
7. Ejecutar proyecto `npm run start:dev`