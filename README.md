# Pedramoura Vehicles Management
System to manage vehicles of Pedramoura and their maintencnaces.
Firstly, be sure you have NodeJS, NPM and Angular installed.

## Front End
To run front end server, run:
 - `cd front-end`
 - `npm install`
 - `ng serve`

The server will be accessible through http://localhost:4200/.

## Back End
To run front end server, run:
 - `cd back-end`
 - `npm install`
 - `npm run dev`

The server will be accessible through http://localhost:3000/.

## NGINX Proxy
To set up an NGINX proxy for routing requests between the front-end and back-end services, use Docker Compose:

- Ensure Docker is installed and running.
- Use the docker-compose.yml file located at the root of the project.
- Run `docker-compose up --build`` to start the services.
- NGINX will route requests from http://localhost to the appropriate service.

## Database
Please setup a SQL Server DB, configure `back-end/configs/DBConfig.js` and run the script contained
in `src/BD_PEDRAMOURA.sql`
