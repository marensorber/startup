const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('public'));

//endpoints here! 
apiRouter.get('/questions', (_req, res) => {
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

fs.readFile('public/assets/luciqs.json', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    questions = data;
});