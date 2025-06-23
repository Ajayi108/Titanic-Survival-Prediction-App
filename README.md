# To clone all the repositories (submodules)
`git clone --recurse-submodules https://mygit.th-deg.de/schober-teaching/student-projects/ain-23-software-engineering/ss-25/IcebergAI/docker-compose`

# Enter the cloned directory
`cd docker-compose`

# To update the submodules to the latest version
`git submodule update --init --remote`

# To start the docker
`docker-compose build --no-cache`
`docker-compose up`

