# Get into the nginx folder the execute the commands

# Creating the nginx image using the default Dockerfile
docker build -t dockermactur/nginx:fullcycle .

# To create a personal network in order to communicate multiple services
docker network create laranet

# Deploying the nginx image into the container syncing the local html folder to the html folder of the container
docker run -d --rm --name nginx -p 80:80 -v ${pwd}/html:/usr/share/nginx/html dockermactur/nginx:fullcycle

# Accessing the container to for example editing the html file
docker exec -it nginx bash