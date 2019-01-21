# for build and run services in docker composer file
docker-compose run -d --build

# for see what services are currently running
docker-compose ps

# for stop the containers that are detached
docker-compose stop

# for remove the containers entirely and volumes
docker-compose down --volumes
