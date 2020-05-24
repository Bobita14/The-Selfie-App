const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.listen(MessagePort, () => console.log(`Listening at ${port}`));

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

//creating database
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

//sending the data
app.get('/api', (request, response) => {
    database.loadDatabase();
    database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      response.json(data);
    });
});

//receiving data
app.post('/api', (request, response) => {
    //console.log(request.body);
    // saving to database
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

