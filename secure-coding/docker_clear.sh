#! /bin/bash

docker ps -a | grep -v "CONTAINER" | awk '{print $1}' | xargs -n 1 -I {} /bin/bash -c 'docker stop {}'
docker ps -a | grep -v "CONTAINER" | awk '{print $1}' | xargs -n 1 -I {} /bin/bash -c 'docker rm {}'
docker volume ls |  awk '{print $2}' | xargs -n1 -I {} /bin/bash -c "docker volume rm {}"
docker images | awk '{print $3}' | xargs -n1 -I {} /bin/bash -c "docker rmi -f {}"
docker network ls | grep -v "NETWORK\|host\|none" | awk '{print $1}' | xargs -n1 -I {} /bin/bash -c "docker network rm {}"

docker network ls | awk '{print $1}' | xargs -n 1 -I {} /bin/bash -c " {}"
