# Fullstack Demo
This repo serves as a simple fullstack example using the bare minimum tools.

The recommended way to view this repo is to first read through this readme, then following along server.js. Server.js is divided into segments, denoted by these comments:

/* ** ** ** */

This guide is intended to go step-by-step through the process of setting up a full stack application. It will not, however provide full support on the prerequisites described below. Please reference official documentation wiht any issues or questions.

After running this example, feel free to explore Node and Docker, as these are excellent industry standard tools that are very important to understand:)
Ejs is hot garbage, but it's very simple. Look into frontend frameworks like react, vue, angular or full stack frameworks like next.js or nuxt if interested.

## Prerequisites

### Setting up Node
Typically, javascript is run in a browser.
However, we can use Node to run javascript on a server too, for backend purposes. This way we can write all of our code in one programming language.

#### Installing Node and Node Package Manager (npm)
Head to https://nodejs.org/en/download and follow the instructions for your operating system.
If you are running Linux or MacOS, you can use Node Version Manager(nvm).
Verify the installation by running 'npm --version'.

### Running a MySQL database using Docker Compose
#### Installing Docker
Before the code in this repo can work, you need to actually set up a running database. I recommend doing this with Docker. Docker is an extremely useful tool in software development, but how it works is not improtant for the purposes of this demonstration.

To run the database, first install Docker and Docker Compose: https://www.docker.com/
If you are running Windows, it is recommended to install Docker Desktop.
Refer to dockers official website for installing on other operating systems.

After installation, run 'docker compose version'. If you get a version number, installation completed successfully. Note: Docker has a tendency to encounter more problems on windows.

#### Running the MySQL database
open the terminal in vscode. You should run the below command from this projects root folder. (i.e.: C:/User/thing/folder/simpleFullstackExample).
Run 'docker compose up -d' (the -d is to run in the background, otherwise the terminal will be take up by the database)
You might need to run the command with elevated privilages.

Congratulations! You now have a running MySQL database locally on your PC.
You can see the running service by opening any command prompt on your pc and running 'docker ps'.

## Running the code in this example repo
Feel free to ignore the files outside of the 'src' folder. The relevant files for this example are all contained within 'src'.

To run this example, I have configured 2 commands.

The first is 'npm run runSql'.
This command executes the SQL found in src/sql/write_sql_here.sql on the database.
For know, the file includes a single SQL query that sets up a very simple users table in the database. You can change the sql code and use the command 'npm run runSql' to execute that sql directly.

The second command is 'npm run dev'. This starts up a web server that can then respons to requests. This will be explained further in src/server.js

### Starting the example
If you've gotten this far and have npm and docker installed, go ahead and run 'npm run runSql', followed by 'npm run dev'. Head over to src/server.js to get started.