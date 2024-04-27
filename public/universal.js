class User{
    #username
    #password
    #results

    constructor(username, password){
        this.username = username
        this.password = password
        this.results = []
    }

    getusername(){
        return this.#username
    }
    
    addresult(res){
        this.#results.push(res)
    }

    getresults(){
        return this.#results
    }

    getpassword(){
        return this.#password
    }

}

class completedResult{
    #date
    #quizname
    #resultname
    #resultinformation

    constructor(date, quizname, resultname, resultinfo){
        this.#date = date
        this.#quizname = quizname
        this.#resultname = resultname
        this.#resultinformation = resultinfo    }

    getdate(){
        return this.#date
    }
    getquizname(){
        return this.#quizname
    }
    getresultname(){
        return this.#resultname
    }
    getresultinfo(){
        return this.#resultinformation
    }
}

class Quiz{
    name
    icon
    questions
    numOfQuestions
    numOfQuestionsPerFactor
    factors
    results

    constructor(quizname, icon, qarray, numq, numqperfactor, farray, rarray){
        this.name = quizname
        this.icon = icon
        this.questions = qarray
        this.numOfQuestions = numq
        this.numOfQuestionsPerFactor = numqperfactor
        this.factors = farray
        this.results = rarray
    }
}

class Question{
    name
    text
    answers
    factor

    constructor(name, text, answers, factor){
        this.name = name
        this.text = text
        this.answers = answers
        this.factor = factor
    }

}

class Answer{
    name
    text
    weight

    constructor(name, text, weight){
        this.name = name
        this.text = text
        this.weight = weight
    }
}

class Factor{
    name
    points

    constructor(name){
        this.name = name
        this.points = 0
    }

    changepoints(weight){
        temp = this.points
        temp = temp + weight
        this.points = temp
    }
}

class Result{
    name
    information

    constructor(name, info){
        this.name = name
        this.information = info
    }
}

function dataToQuiz(filename){
    let quizdata = fetch(filename)
    const obj = JSON.parse(quizdata)

    let questions = []
    for(i = 0; i < obj.questions.length; i++){
        let currq = obj.questions[i]
        let answersarray = []
        for(j = 0; j < currq.answers.length; j++){
            let curra = currq.answers[j]
            answersarray.push(new Answer(curra.name, curra.text, curra.weight))
        }
        questions.push(new Question(currq.name, currq.text, answersarray, currq.factor))
    }

    let factors = []
    for(i = 0; i < obj.factors.length; i++){
        temp = new Factor(quizfactors[i]);
        factors.push(temp)
    }

    let results = []
    for(i = 0; i < obj.results.length; i++){
        currres = obj.results[i]
        results.push(new Result(currres.name, currres.information))
    }

    let quiz = new Quiz(obj.name, obj.icon, questions, obj.numOfQuestions, obj.numOfQuestionsPerFactor, factors, results)
    return quiz
}

function login(){
    let username = document.querySelector("#username")
    console.log(username)
    localStorage.setItem("username", username.value)
    console.log(localStorage.getItem("username"))
    const currUser = new User(username, document.querySelector('#password'))
    console.log(currUser.getusername)
    console.log(currUser.getpassword)
    localStorage.setItem("user", currUser)
    console.log(localStorage.getItem("user"))
    window.location.href = "home.html"
}

function register(){
    let username = document.querySelector("#username")
    localStorage.setItem("username", username.value)
    let currUser = new User(username, document.querySelector('#password'))
    localStorage.setItem("user", currUser)
    window.location.href = "home.html"
}

function insertUserResults(){
    let user = localStorage.getItem("user")
    //console.log(user.getusername)
    //console.log(user.getresults)
    if(user === null){
        let res = document.createElement("li")
        res.innerHTML = `No Results For User`
        let results = document.getElementById("results")
        results.appendChild(res)
    }else{
        for(i = 0; i < user.getresults.length; i++){
            currresult = user.getresults[i]
            let res = document.createElement("li")
            res.innerHTML = `<a href="resultspage.html">${currresult.getdate()}</a>`
            let results = document.getElementById("results")
            results.appendChild(res)
        }
    }
    
    
}

function insertUsername(){
    let usernameEl = document.createElement("p")
    let currentuser = localStorage.getItem("username")
    console.log(currentuser)
    usernameEl.innerHTML = `${currentuser}`
    let info = document.getElementById("userinfo")
    info.appendChild(usernameEl)
}

function userOnload(){
    insertUserResults()
    insertUsername()
}

function insertQuizInfo(){
    let user = localStorage.getItem("user")
    for(i = 0; i < user.getresults.length; i++){
        currresult = user.getresults[i]
        let res = document.createElement("li")
        res.innerHTML = `<a href="resultspage.html">${currresult.getdate()}</a>`
        let results = document.getElementById("results")
        results.appendChild(res)
    }
    let quiznameEl = document.getElementById("quizname")
    quiznameEl.innerHTML = `Luci's MBTI Quiz`
}

function quizOnload(){
    insertQuizInfo()
}

function resultsOnload(){
    let result = localStorage.getItem("result")
    document.getElementById("resultname") = result.name
    document.getElementById("resulttext") = result.information
}

  


  
  

