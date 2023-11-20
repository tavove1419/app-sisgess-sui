# FROM node:18-alpine3.15 as build-step

# #RUN mkdir -p /app

# WORKDIR /app

# #COPY package.json /app

# RUN npm install

# COPY . .

# RUN npm run build --configuration production

# #segunda etapa

# FROM nginx:1.17.1-alpine

# COPY --from=build-step /app/dist/SigessApp /usr/share/nginx/html
# Usa la imagen oficial de Node como base
FROM node:18-alpine3.15 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /src/app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos de la aplicación al contenedor
COPY . .

# Construye la aplicación Angular en modo de producción
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine

# Copia los archivos de construcción de la etapa anterior
COPY --from=build /app/dist/SigessApp/ /usr/share/nginx/html

# Expone el puerto 80 para que la aplicación Angular sea accesible desde el exterior
EXPOSE 80

# Comando para iniciar el servidor nginx
CMD ["nginx", "-g", "daemon off;"]
