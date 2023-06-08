const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const emailjs = require('@emailjs/nodejs');
require('dotenv').config({ path: __dirname + '/.env' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/contact", (req, res) => {
    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, req.body, { publicKey: process.env.PUBLIC_KEY, privateKey: process.env.PRIVATE_KEY })
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    res.json({ message: "Message SENT!" });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();

