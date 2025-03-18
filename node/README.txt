# The Dockerfile.dev is an example of using dockerize to syncronize containers in order to make them
# work together when it needed one to be ready first to the other starts adequately.
# Inside de Dockerfile.dev there are commands to install the dockerize dependency as well

# The default Dockerfile is an examplo of using the native feature of the Docker which is the healthcheck feat.
# That's the best way to work among different containers. In practice, it has been redirect the responsibility
# of the configurations to the docker-compose file. In most of the time it'll be needed to work with additional
# file, which is the init.sql file, to manipule all the steps needed to make the mechanism work well.
# In the package.json it'll be needed to insert a command line inside the scripts block as it is ["dev": "node index.js"]
# This will be the way to run the index.js file to start the node application on image startup process

# Get into the node folder the execute the commands
# Docker Commands:
docker build -t dockermactur/node:dev .
docker build -t dockermactur/node:dev -f node/Dockerfile node

docker run -dit --rm --name node -p 3000:3000 dockermactur/node:dev

# Linking a folder to a container spot in order to sync all the files
docker run -it --rm -p 3000:3000 -v ${pwd}/:/usr/src/app node:23 bash

# To create a node project using some dependencies
# Access the usr/src/app folder and execute those commands above:
# npm init
# npm install express --save
# npm install mysql2 --save