// Fastify is a library that helps us easily set up an api.
import Fastify from "fastify";

const server = Fastify({ logger: true });

/* ** ** ** */

// Demonstrates a simple endpoint.
// This Node app exposes an endpoint at / (root).
// This endpoint returns a simple message "Hello from Fastify".
// Try running 'npm run dev' in the console to turn on the application. The go to a browser, and type 'http://localhost:8000'.
server.get("/", (_req, reply) => {
  reply.send({ message: "Hello from Fastify" });
});

/* ** ** ** */

// mysql2 is a barebones library that allows us to connect to a database and run SQL queries on it.
import mysql from "mysql2/promise";

// Connection info for the database, see docker-compose.yaml where these variables(password, etc...) are defined.
const connection = await mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysqlpass",
  database: "db"
});

/* ** ** ** */

// This endpoint is at 'localhost:8000/users'.
// It runs some sql on the database and sends back the data.
// You'll notice that if you access this endpoint in a browser, there are no users yet. The response is empty('[]').
server.get("/users", async (_req, reply) => {
  const [rows] = await connection.query("SELECT * FROM users");
  reply.send(rows);
});

/* ** ** ** */

// This endpoint takes a parameter 'name'.
// It is accessible in req.params.name.
// Try opening 'localhost:8000/users/post/John'
// Then go back to the previous /users endpoint.
server.get("/users/post/:name", async (req, reply) => {
  const name = req.params.name;
  connection.query("INSERT INTO users (name) VALUES (?)", [name]);
  reply.send({ message: `User ${name} added successfully` });
});  

/* ** ** ** */

// Often, we want to send HTML as a response to requests, instead of 'raw data'.
// The HTML we send below is a static file, and we can use Fastify's official fastify static plugin to send it.
import fastifyStatic from "@fastify/static";
// The below is shenanigans to get the annoying path fuckery to just work. Please ignore.
import path from "node:path"; //IGNORE
import { fileURLToPath } from 'url'; //IGNORE
import { dirname } from 'path'; //IGNORE
const __filename = fileURLToPath(import.meta.url); //IGNORE
const __dirname = dirname(__filename); //IGNORE
server.register(fastifyStatic, { //IGNORE
  root: path.join(__dirname + "/html") // This is where we store our HTML, just a refernce point.
});

server.get("/html", (_req, reply) => {
  reply.sendFile("index.html");
});

/* ** ** ** */

// We may also want to supply some HTML that changes dynamically with the data in the database.
// One very simple way to accomplish this is with ejs.
// We need to use another official fastify plugin that allows us to generate dynamic html.
// We also need to tell it that we want to use ejs.
import ejs from "ejs";
import fastifyView from "@fastify/view";
server.register(fastifyView, {
  engine: {
    ejs: ejs
  }
});

server.get("/ejs", async (_req, reply) => {
  const [rows] = await connection.query("SELECT * FROM users");
  return reply.viewAsync("src/html/index.ejs", { users: rows });
});

/* ** ** ** */

// Server stuff
server.listen({ port: 8000 });