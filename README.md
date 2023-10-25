# CRUD Demo 3 (Actually 2): Electric Boogaloo
A simple CRUD Multi-page Todo app using the SVFN Stack.

## SVFN Stack
Sequelize, Vue, Fastify, Node
- Sequelize is cool. Hard to get used to, but is very efficient once you practice.
- Vue. Lots of docs, very confusing but satisfying to use.
- Fastify. WTF? 
- Node. Node.

## Installation
1. Install MySQL. Make a new user, and make a new database named `todo`. Grant all permissions on `todo` for your new user.
2. Go to the /client and /server subdirectories and `npm i` to install packages required.
3. To manage the database, sequelize CLI can be used to automate most of it. We can use the following commands to migrate and seed our database:
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## How to run
```
cd /client
npm run serve
cd /../server
npm start
```