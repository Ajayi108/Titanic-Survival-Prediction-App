## To clone all the repositories (submodules)
```
git clone --recurse-submodules https://github.com/Ajayi108/Titanic-Survival-Prediction-App
```

## Enter the cloned directory
```
cd Titanic-Survival-Prediction-App
```

## To update the submodules to the latest version
```
git submodule update --init --remote
```
# Before proceeding you must download docker on your computer

## To Build the docker
```
docker-compose build --no-cache
```
## To rebuild the docker
```
docker-compose down -v
```


## To Start the docker
```
docker-compose up
```
## The app runs on http://localhost:8080/

## On start there is a default password 
```EMail: admin@ice.com```
```password: pass```

