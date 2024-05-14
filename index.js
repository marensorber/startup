const express = require('express');
//const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());

const port = process.argv.length > 2 ? process.argv[2] : 8080;

app.use(express.static('public'));







//database setup
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const luciQuiz = require('./public/assets/luciqs2.json');

async function db(){
    const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
    const client = new MongoClient(url);
    const db = client.db('startup');
    const quizCollection = db.collection('quiz');
    const userCollection = db.collection('user');

    // Test that you can connect to the database
    (async function testConnection() {
        await client.connect();
        await db.command({ ping: 1 });
    })().catch((ex) => {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    });

    //insert the Luci Quiz
    //const luci = luciQuiz;
    //await quizCollection.insertOne(luci);

    getQuizFromDB(quizCollection)
}

async function getQuizFromDB(quizCollection){
    const query = { qname: "Luci Quiz"};
    const options = {
        sort: { score: -1 },
        limit: 10,
    };

    const cursor = quizCollection.find(query, options);
    const quizzes = await cursor.toArray();
    //quizzes.forEach((i) => console.log(i));
    console.log(quizzes[0]);
    console.log(JSON.stringify(quizzes[0].qs))
    let stringQs = JSON.stringify(quizzes[0]);
    console.log("Stringified Questions!!")
    console.log(stringQs);
    questions = stringQs;
}

async function addUsertoDB(userBody, ){

}

//end practice data








// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//endpoints here! 
apiRouter.get('/questions', (_req, res) => {
    console.log("sending questions")
    //console.log(JSON.stringify(questions));
    console.log(questions);
    res.send(questions);
  });

apiRouter.get('/results', (_req, res) => {
    console.log("sending results")
    //results = readResults(results)
    //console.log(results);
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


//Save a new user
apiRouter.post('/register', (req, res) => {
    let newUser = addUsertoDB(req.body, users);
    res.send(newUser);
    
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

  // Listening to a network port
//const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


let questions = [];
db();
console.log(`HERE ARE THE QUESTIONS = ${questions}`);
var fs = require('fs');
/*
fs.readFile('public/assets/luciqs2.JSON', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    questions = data;
    console.log(questions);
});

let results = []
let users = getUsersFromDB();*/
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