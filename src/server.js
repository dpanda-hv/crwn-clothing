const express = require('express');
const path = require('path');
const createApolloServer = require('./apollo/apollo.server');

const app = express();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.send(path.join(__dirname, 'build/index.html'));
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const payment = require('./routes/payment');

app.use(payment);

const apolloServer = createApolloServer(app);

apolloServer.then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`APP is listening on port ${PORT}`);
  });
});
