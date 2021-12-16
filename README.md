# Gifty REST Backend
Backend implementation for Gifty using Express + Mongoose.

## About the project

This is backend service for Gifty browser app that allows users to register, login and save their favorite gifs. The service has been implemented as a REST API.

## Build with
* NodeJS (Express)
* MongoDB (Mongoose)
* JWT (jsonwebtoken)

## Installation

1. Clone this repository
    ```sh
    git clone https://github.com/marcsicr/gifty-backend-nodejs
    ```

### Option 1 - Docker 
2. Build and deploy gifty-backend and MongoDB containers using **docker-compose**
    ```sh
    cd gifty-backend-nodejs
    docker-compose up
    ``` 
### Option 2 - Custom configuration
2. Install NPM packages
    ````sh
    npm install
    ````
3. Create **.env** file in the root directiory of this project. Add your specific MongoDB details and JWT signing key for example:
    ```
    DB_HOST=localhost
    DB_PORT=27017
    DB_USER=marcsicr
    DB_PASS=secret
    TOKEN_SIGN_KEY=very_secret
    ````
4. Run server. By default it starts on http://localhost:3005 
    ````sh
    npm start 
    ````
    
