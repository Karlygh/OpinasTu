# Usa una imagen base de Nginx ligera
FROM nginx:alpine

# Limpia la carpeta por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos de Angular ya compilados (build) a Nginx
COPY dist/opinas-tu/browser /usr/share/nginx/html




# Expone el puerto 80 (el que usa Nginx por defecto)
EXPOSE 80

# Inicia Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
