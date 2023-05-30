# PassportJS-Auth-System

Built in NodeJS, this project utilizes the PassportJS library (Local Strategy) to authenticate users and set protected routes. The user data is stored in MongoDB Cloud.

## To run this Repository locally

1. Clone the repository
2. Run 
```
npm install
```
3. Create a Cluster on MongoDB and copy the MongoURI
4. Create a `.env` file in root directory and add your URI there as:
```
MONGO_URI = "<YOUR URI>"
```
5. Run
```
npm start
```

You can then test the code using a tool like Postman.

## Commands

```
npm init -y
```

```
npm i express jsonwebtoken dotenv mongoose passport passport-local
```

```
npm i --save-dev nodemon
```

Add the following line of code under `scripts` to package.json
```
"start": "nodemon index",
```
