const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/index');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api', apiRouter);

app.get('/', function(req, res) {
  res.send('Hello from server');
});

app.listen(PORT, function() {
  console.log('Server is running on port ' + PORT);
});
