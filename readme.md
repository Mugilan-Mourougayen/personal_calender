
# Personal Calender
This is a React, NodejS, and Flask application to personalize your meeting schedule 

## Pre requisites
- Node js 
- Git
- VS code or editor or your choise
- React 
- Pyton 3
- OpenAi
- Giskard
- mongobd




## Authors

- [@Mugilan-Mourougayen](https://github.com/Mugilan-Mourougayen)

## Client 
To run the client, navigate to the client folder and  give the following command

To install all the dependency

` npm i`

To start the client 

`npm start`

The client starts in port 3000

`http://localhost:3000`


## Server 
To run the server, navigate to the server folder and give the following command 

To install all the dependency

`npm i`  

To start the server  

`npm start`


The server running in port 3000

## Database 
Create .env file inside the server and give the MongoDB URL in MONGO_DB_URL
also to make open AI work, give the openAI key inside .env in the name OPENAI_API_KEY

## Pages 

There are 4 pages in this application
1. login. 
2. register.
3. schedule.
4. availability.

## Working

- Any user can schedule or reserve a meeting on the schedule page. 
- To schedule choose a date check whether the person is available or not and schedule a meeting time within hi available time and update.
-If the person reserves a time other than the available time he/she cannot reserve.
-User can reserve a slot by providing their name, title, email, and time. 
- Can delete the slot by providing their mail.


- To set availability only authenticated user can be done So, You have to register on the register page with your name, email, and password.

- Once registered you can access the availability, or existing users can access it by logging in.


- On the availability page user can add their availability time in slots on the same day, can update and delete the availability of the entire day 


## Note
- There is a another python flask server running in port 4000 
- This is for LLM modal to check the date is public holiday or not.
- There is an AI check button on the availability page which tells the user whether it is a public holiday or not.
- I tried to check the CSV data with Giskard 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_DB_URL`

`OPENAI_API_KEY`


## Run using Docker
To run using  docker download the file and type the following command from the directory where docker-compose.yml file is present

`docker-compose up`

The will be running in localhost:3000

