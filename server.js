const express = require('express');
const path = require('path');

const connectDatabase = require('./config/database');

const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

const app = express();

connectDatabase();

const PORT = process.env.PORT || 5000;

app.use(express.json({extended: false}));

app.use('/api/auth', authRouter);

app.use('/api/contacts', contactsRouter);

app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('/*', (_request, response) =>
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
