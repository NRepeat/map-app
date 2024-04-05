# Use NGINX as base image
FROM nginx

# Set the working directory
WORKDIR /srv/www/static

# Copy the static files from local machine to the container
COPY ./frontend/dist .

# Copy the NGINX configuration file
COPY default.conf /etc/nginx/conf.d/default.conf
