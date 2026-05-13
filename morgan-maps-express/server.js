const express = require('express');

const path = require('path');

const basicAuth = require('express-basic-auth');

const app = express();

const PORT = process.env.PORT || 5173;

const PUBLIC_DIR = path.join(__dirname, 'public');

app.use(

  basicAuth({

    users: {

      [process.env.APP_USER || 'team']: process.env.APP_PASSWORD || 'change-me'

    },

    challenge: true

  })

);

app.use(express.static(PUBLIC_DIR));

app.get('*', (_req, res) => {

  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));

});

app.listen(PORT, () => {

  console.log(`Running on http://localhost:${PORT}`);

});