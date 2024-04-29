const express = require('express');
//const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());

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

apiRouter.get('/results', (_req, res) => {
    console.log("sending results")
    //results = readResults(results)
    console.log(results);
    res.send(results);
});

// Save a result
apiRouter.post('/result', (req, res) => {
    console.log(req.body)
    console.log(`results before add: ${results}`)
    let savedResults = addResult(req.body, results);
    console.log(`results after add: ${savedResults}`)
    res.send(savedResults);
    
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

let results = []
//var fs = require('fs');

fs.readFile('public/assets/results.JSON', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    results = data;
    console.log(results);
    //return results;
});

/*function readResults(results){
    fs.readFile('public/assets/results.JSON', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        results = data;
        console.log(results);
        return results;
    });
}*/



function addResult(result, results){
    console.log("ADDING RESULT!!!")
    //console.log(`result = ${result}`)
    //let finalresults = 
    /*fs.readFile('public/assets/results.JSON', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }*/
        //console.log(`parsed results: ${JSON.parse(data)}`)
    let parsedResults = JSON.parse(results);
    newNum = Number(parsedResults.rnum) + Number(1);
    console.log(`new number = ${newNum}`)
    parsedResults["r"+ newNum.toString()] = result;
    parsedResults.rnum = newNum.toString();
    results = JSON.stringify(parsedResults)
        
    console.log(`final results : ${results}`)
        //parsedResults.results.push(result)
        //console.log(parsedResults);
    //let newJson = JSON.stringify(results); //convert it back to json
    
    fs.writeFile('public/assets/results.JSON', results, 'utf8', (error) => {
        if (error) {
            console.error(error);
        }
    });
    console.log("returning final results!")
    return results; 
    //});
    //return results;
}