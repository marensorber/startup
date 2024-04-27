const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('public'));


// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
//endpoints here! 
apiRouter.get('/questions', (_req, res) => {
    console.log("sending questions")
    console.log(questions);
    res.send(questions);
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

  // Listening to a network port
const port = 8080;
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});


let questions = []
var fs = require('fs');

fs.readFile('public/assets/luciqs.JSON', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    questions = data;
    console.log(questions);
});