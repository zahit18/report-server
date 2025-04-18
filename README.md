<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en Dev

1. Clonar el proyecto
2. Instalar dependencias `npm install`
3. Clonar `env.template` y renombrar a `.env`
4. Levantar la base de datos `docker compose up -d`
5. Entrar a localhost:8080
6. Usar credenciales que vienen en `docker-compose.yml`
7. Crear bases de datos que estan en `./querys/`
8. Generar el Prisma client `npx prisma generate`
9. Ejecutar proyecto `npm run start:dev`