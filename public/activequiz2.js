/*
FACTORS 
**most neg to most positive!
IE = if negative that means introverted
SN
TF
JP
 */

//const completedResult = require ("./user.js")

//import { completedResult } from './user.js';

//These will be loaded from the database eventually
const intjinfo = "here is the INTJ info"
const istjinfo = "here is the ISTJ info"
const isfjinfo = "here is the ISFJ info"
const isfpinfo = "here is the ISFP info"
const istpinfo = "here is the ISTP info"
const intpinfo = "here is the INTP info"
const infpinfo = "here is the INFP info"
const infjinfo = "here is the INFJ info"
const entjinfo = "here is the ENTJ info"
const enfjinfo = "here is the ENFJ info"
const entpinfo = "here is the ENTP info"
const estjinfo = "here is the ESTJ info"
const esfjinfo = "here is the ESFJ info"
const estpinfo = "here is the ESTP info"
const enfpinfo = "here is the ENFP info"
const esfpinfo = "here is the ESFP info"

let quiz = null; 

class completedResult{
    #date
    #resultname
    #resultinformation

    constructor(date, resultname, resultinfo){
        this.#date = date
        this.#resultname = resultname
        this.#resultinformation = resultinfo    }

    getdate(){
        return this.#date
    }
    getresultname(){
        return this.#resultname
    }
    getresultinfo(){
        return this.#resultinformation
    }
    toString(){
        return `Result ${this.#date}: ${this.#resultname}`
    }
}

class Quiz {
    name = "Luci's MBTI QUIZ"
    questions = []
    
    async loadQuestions(){
        this.questions = []
        console.log("let's try to load the questions!")
        try{
            //get the questions from the service
            console.log("CHECKPOINT 1")
            const response = await fetch('api/questions');
            console.log("CHECKPOINT 2")
            let tempquestions = await response.json();
            console.log("CHECKPOINT 3")
            console.log(`qnum = ${tempquestions.qs.qnum}`)
            let qnum = Number(tempquestions.qs.qnum);
            //console.log(`temp questions = ${JSON.stringify(tempquestions)}`)
            console.log("CHECKPOINT 4")
            //let q1 = new Question(JSON.stringify(tempquestions.qs.q1.name), JSON.stringify(tempquestions.qs.q1.text), JSON.stringify(tempquestions.qs.q1.answers).split("}"),JSON.stringify(tempquestions.qs.q1.factor))
            //console.log(`question 1 = ${q1.toString()}`)
            //this.questions[0] = new Question("q1", JSON.stringify(tempquestions.qs.q1.text), this.extractAnswers(tempquestions.qs.q1.answers), JSON.stringify(tempquestions.qs.q1.factor))
            //this.questions[1] = new Question("q2", JSON.stringify(tempquestions.qs.q2.text), this.extractAnswers(tempquestions.qs.q2.answers), JSON.stringify(tempquestions.qs.q2.factor))
            //this.questions[2] = new Question("q3", JSON.stringify(tempquestions.qs.q3.text), this.extractAnswers(tempquestions.qs.q3.answers), JSON.stringify(tempquestions.qs.q3.factor)) 
            //this.questions[3] = new Question("q4", JSON.stringify(tempquestions.qs.q4.text), this.extractAnswers(tempquestions.qs.q4.answers), JSON.stringify(tempquestions.qs.q4.factor))
            //this.questions[4] = new Question("q5", JSON.stringify(tempquestions.qs.q5.text), this.extractAnswers(tempquestions.qs.q5.answers), JSON.stringify(tempquestions.qs.q5.factor))
            
            /*
            let ids = []

            for(let i = 0; i < qnum; i++){
                console.log("CHECKPOINT 5")
                let curr = "qs.q" + (i+1).toString();
                console.log(curr);
                ids[i] = curr
            }*/
            for(let i = 0; i < qnum; i++){
                console.log("CHECKPOINT ????")
                let index = i + 1
                this.questions[i] = new Question(("q"+ index.toString()), JSON.stringify(tempquestions.qs["q" + index.toString()].text), this.extractAnswers(tempquestions.qs["q" + index.toString()].answers), JSON.stringify(tempquestions.qs["q" + index.toString()].factor))
                //console.log(`current q = ${this.questions[i]}`)
            }
            for(let i = 0; i < qnum; i++){
                console.log(`current q = ${this.questions[i]}`)
            }
            

            console.log("CHECKPOINT 6")
            console.log(`Here is the response = ${this.questions}`);
            //save the questions
            localStorage.setItem("questions", this.questions);
            console.log("CHECKPOINT 7")
            console.log(`local storage questions = ${localStorage.getItem("questions")}`)
            
            console.log("CHECKPOINT 8")
            //console.log(`local storage questions = ${localStorage.getItem("questions")}`)
            localStorage.setItem("quiz", this)

            //document.getElementById('nextButton').setAttribute('onclick', `nextquestion(${this.questions})`)

            let index = 0
            console.log("displaying the question!")
            localStorage.setItem("index", index)
            this.displayQuestion(index)

        } catch{
            // If there was an error
            console.log("ERROR")
            
        }

    }

    extractAnswers(answers){
        let ans = []
        for(let i = 1; i < 8; i++){
            ans[(i - 1)] = new Answer(("a" + i.toString()), JSON.stringify(answers["a"+ i.toString()].text), Number(JSON.stringify(answers["a"+ i.toString()].weight)));
        

        }
        //ans[0] = new Answer("a1", JSON.stringify(answers.a1.text), Number(JSON.stringify(answers.a1.weight)));
        //ans[1] = new Answer("a2", JSON.stringify(answers.a2.text), Number(JSON.stringify(answers.a2.weight)));
        //ans[2] = new Answer("a3", JSON.stringify(answers.a3.text), Number(JSON.stringify(answers.a3.weight)));
        //ans[3] = new Answer("a4", JSON.stringify(answers.a4.text), Number(JSON.stringify(answers.a4.weight)));
        //ans[4] = new Answer("a5", JSON.stringify(answers.a5.text), Number(JSON.stringify(answers.a5.weight)));
        //ans[5] = new Answer("a6", JSON.stringify(answers.a6.text), Number(JSON.stringify(answers.a6.weight)));
        //ans[6] = new Answer("a7", JSON.stringify(answers.a7.text), Number(JSON.stringify(answers.a7.weight)));
        return ans; 
    }

    getQuestions(){
        return this.questions
    }
    
    displayQuestion(index){
        console.log("DISPLAY CHECKPOINT 0")
        //let qs = localStorage.getItem("questions")
        //let questions = this.questions
        let currq = this.questions[index]
        
        console.log("DISPLAY CHECKPOINT 1")
        console.log(`currq = ${currq}`)
        if(currq != null){
            this.updatebar(index, this.questions.length)
            localStorage.setItem("factor", currq.getFactor())
            console.log("DISPLAY CHECKPOINT 2")
            let numEl = document.querySelector('#qnum')
            console.log("DISPLAY CHECKPOINT 3")
            numEl.innerHTML = `${currq.getText()}`
            console.log("DISPLAY CHECKPOINT 4")
            //let textEl = document.querySelector('#qtext')
            //textEl.innerHTML = ""
            let answers = currq.getAnswers()
            console.log("DISPLAY CHECKPOINT 5")
            console.log(`here are the current answers = ${answers}`)
            console.log(`current answer array length = ${answers.length}`)
            
            let htmlAnsList = document.getElementById("anslist")
            htmlAnsList.innerHTML = ""
            for(let j = 0; j < answers.length; j++){
                console.log("DISPLAY CHECKPOINT 6")
                let answer = answers[j]

                let currans = document.createElement("choice-bubble")
                let currfactor = currq.getFactor().substring(1,3)
                let currweight = answer.getWeight()
                currans.innerHTML = `<input type="radio" id="${"ans"+j}" onclick="buttonClicked('${currweight}', '${currfactor}')">
                <label for="${"ans"+j}">${answer.getText()}</label>`
                
                htmlAnsList.appendChild(currans)
            }
        }else{
            let numEl = document.querySelector('#qnum')
            numEl.innerHTML = `Question 0`
            //let textEl = document.querySelector('#qtext')
            //textEl = 'NULL TEXT'
    
            let currans = document.createElement("choice-bubble")
            currans.innerHTML = `<input type="radio" id="answer0">
            <label for="answer0">Answer 0</label>`
            let answers = document.getElementById("anslist")
            answers.appendChild(currans)
        }
        
    
        
    }
    
    nextquestion(){
        console.log("GOT TO NEXT QUESTION!!")
        let index = localStorage.getItem("index")
        index = Number(index) + 1
        //let quiz = localStorage.getItem("quiz")
        console.log(`new index = ${index} out of question length ${this.questions.length}`)
    
        this.incrementFactors(localStorage.getItem("selectedfactor"), localStorage.getItem("selectedweight"))
        
        console.log(`index = ${index} and comparing factor = ${(this.questions.length + 1)}`)
        if(index >= this.questions.length){
            console.log("next q CHECKPOINT 2")
            this.luciResults()
            window.location.href = "resultspage.html";
        }else{
            console.log("next q CHECKPOINT 3")
            this.displayQuestion(index)
            localStorage.setItem("index", index)
        }
    }
    
    updatebar(index, numq){
        let percent = (index / numq) * 100
        document.getElementById('bar').style.width = percent+"%"
        
    }
    
    incrementFactors(factor, weight){
        console.log("time to increment")
        console.log(`factor = ${factor} and weight = ${weight}`)
        let og = Number(localStorage.getItem(factor))
        console.log(`the new factor value should be ${og} + ${weight}`)
        if(og != null){
            console.log("og is not null!")
            let newfact = Number(og) + Number(weight)
            console.log(`new factor value = ${newfact}`)
            localStorage.setItem(factor, newfact)
        }else{
            console.log("ohno")
        }
    }
    
    luciResults(){
        console.log("Results Checkpoint 1")
        let result = []
        let intExt = localStorage.getItem("IE")
        console.log(`IE value = ${intExt}`)
        let sensInt = localStorage.getItem("SN")
        console.log(`SN value = ${sensInt}`)
        let thinkFeel = localStorage.getItem("TF")
        console.log(`TF value = ${thinkFeel}`)
        let judgePros = localStorage.getItem("JP")
        console.log(`JP value = ${judgePros}`)
        
        console.log("Results Checkpoint 2")
        if(intExt < 0){
            result[0] = "I"
        }else if( intExt > 0){
            result[0] = "E"
        }else{
            result[0] = "?"
        }
        console.log(`result for IE = ${result[0]}`)
    
        console.log("Results Checkpoint 3")
        if(sensInt < 0){
            result[1] = "S"
        }else if(sensInt > 0){
            result[1] = "N"
        }else{
            result[1] = "?"
        }
        console.log(`result for SN = ${result[1]}`)
    
        console.log("Results Checkpoint 4")
        if(thinkFeel < 0){
            result[2] = "T"
        }else if(thinkFeel > 0){
            result[2] = "F"
        }else{
            result[2] = "?"
        }
        console.log(`result for TF = ${result[2]}`)
    
        console.log("Results Checkpoint 5")
        if(judgePros < 0){
            result[3] = "J"
        }else if(judgePros > 0){
            result[3] = "P"
        }else{
            result[3] = "?"
        }
        console.log(`result for JP = ${result[3]}`)

        console.log(`final result = ${result.toString()}`)
    
        switch (result.toString()){
            case "I,N,T,J":
                localStorage.setItem("resultname", "INTJ")
                localStorage.setItem("resultinfo", intjinfo)
                break
            case "I,S,T,J":
                localStorage.setItem("resultname", "ISTJ")
                localStorage.setItem("resultinfo", istjinfo)
                break  
            case "I,N,F,J":
                localStorage.setItem("resultname", "INFJ")
                localStorage.setItem("resultinfo", infjinfo)
                break
            case "I,N,T,P":
                localStorage.setItem("resultname", "INTP")
                localStorage.setItem("resultinfo", intpinfo)
                break  
            case "I,S,F,P":
                localStorage.setItem("resultname", "ISFP")
                localStorage.setItem("resultinfo", isfpinfo)
                break  
            case "I,S,F,J":
                localStorage.setItem("resultname", "ISFJ")
                localStorage.setItem("resultinfo", isfjinfo)
                break
            case "I,S,T,P":
                localStorage.setItem("resultname", "ISTP")
                localStorage.setItem("resultinfo", istpinfo)
                break  
            case "I,N,F,P":
                localStorage.setItem("resultname", "INFP")
                localStorage.setItem("resultinfo", infpinfo)
                break  
            case "E,N,T,J":
                localStorage.setItem("resultname", "ENTJ")
                localStorage.setItem("resultinfo", entjinfo)
                break
            case "E,S,T,J":
                localStorage.setItem("resultname", "ESTJ")
                localStorage.setItem("resultinfo", estjinfo)
                break  
            case "E,N,F,J":
                localStorage.setItem("resultname", "ENFJ")
                localStorage.setItem("resultinfo", enfjinfo)
                break
            case "E,N,T,P":
                localStorage.setItem("resultname", "ENTP")
                localStorage.setItem("resultinfo", entpinfo)
                break  
            case "E,S,F,P":
                localStorage.setItem("resultname", "ESFP")
                localStorage.setItem("resultinfo", esfpinfo)
                break  
            case "E,S,F,J":
                localStorage.setItem("resultname", "ESFJ")
                localStorage.setItem("resultinfo", esfjinfo)
                break
            case "E,S,T,P":
                localStorage.setItem("resultname", "ESTP")
                localStorage.setItem("resultinfo", estpinfo)
                break  
            case "E,N,F,P": 
                localStorage.setItem("resultname", "ENFP")
                localStorage.setItem("resultinfo", enfpinfo)
                break 
            case "?,?,?,?": 
                localStorage.setItem("resultname", "????")
                localStorage.setItem("resultinfo", "all hail the woman of mystery")
                break 
            default: 
                localStorage.setItem("resultname", result[0].concat(result[1], result[2], result[3]))
                localStorage.setItem("resultinfo", ":(((")
        }
        console.log(`final results (saved to local storage!): name = ${localStorage.getItem("resultname")} and info = ${localStorage.getItem("resultinfo")}`)
        let finalRes = new completedResult(getCurrentDate(), localStorage.getItem("resultname"), localStorage.getItem("resultinfo"))
        this.saveResult(finalRes)
    
    }

    async saveResult(result) {
        console.log("sending new result")
        //const userName = this.getPlayerName();
        //const date = new Date().toLocaleDateString();
        const newResult = {date: result.getdate(), resultname: result.getresultname(), resultinfo: result.getresultinfo()};
        console.log(`result = ${JSON.stringify(newResult)}`)
        try {
          const response = await fetch('/api/result', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newResult),
          });
    
          // Store what the service gave us as the high scores
          const serviceresults = await response.json();
          console.log(`service results = ${JSON.stringify(serviceresults)}`)
          //const scores = await response.json();
          //localStorage.setItem('scores', JSON.stringify(scores));
        } catch(error) {
          // If there was an error then just track scores locally
          //this.updateScoresLocal(newScore);
          console.log(`error saving results: ${error}`)
        }
      }
    

}


class Question{
    name = "no name"
    text ="no text"
    answers = []
    factor = "no factor"
    constructor(name, text, ansArray, factor) {
        this.name = name;
        this.text = text; 
        this.answers = ansArray;
        this.factor = factor;
      }
    toString(){
        return `name = ${this.name}, text = ${this.text}, answers = ${this.answers}, factor = ${this.factor}`
    }
    getText(){
        return this.text
    }
    getAnswers(){
        return this.answers
    }
    getFactor(){
        return this.factor
    }
}

class Answer{
    name = "no name"
    text ="no text"
    weight = 0
    constructor(name, text, weight) {
        this.name = name;
        this.text = text; 
        this.weight = weight; 
      }
    toString(){
        return `name = ${this.name}, text = ${this.text}, weight = ${this.weight}`
    }
    getWeight(){
        return this.weight
    }
    getText(){
        return this.text
    }
}

function resetFactors(){
    localStorage.setItem("IE", 0)
    localStorage.setItem("SN", 0)
    localStorage.setItem("TF", 0)
    localStorage.setItem("JP", 0)
}

function onload(){
    console.log("Beginning to load active quiz 2!")
    resetFactors()
    //let quiz = localStorage.getItem("quizname")
    localStorage.setItem("questions", '{"name":"q0", "text":"oh no there isnt any text", "factor":"???"}')

    quiz = new Quiz()
    console.log("Loading questions!")
    quiz.loadQuestions()
    
    
    

}

function getCurrentDate(){
    const date = new Date();
    let currDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return currDate
}

function nextQuestion(){
    quiz.nextquestion()
}

function buttonClicked(weight, factor){
    //let factor = "IE"
    //let weight = 0
    console.log(`button has been clicked. factor = ${factor} and weight = ${weight}`)
    localStorage.setItem("selectedfactor", factor)
    localStorage.setItem("selectedweight", weight)
}

//window.buttonClicked = buttonClicked; 
onload()

