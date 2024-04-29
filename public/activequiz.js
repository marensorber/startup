

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
        try{
            const response = await fetch('api/questions');
            let tempquestions = await response.json();
            let qnum = Number(tempquestions.qs.qnum);
            
            for(let i = 0; i < qnum; i++){
                let index = i + 1
                this.questions[i] = new Question(("q"+ index.toString()), JSON.stringify(tempquestions.qs["q" + index.toString()].text), this.extractAnswers(tempquestions.qs["q" + index.toString()].answers), JSON.stringify(tempquestions.qs["q" + index.toString()].factor))
            }
            
            localStorage.setItem("questions", this.questions);
            localStorage.setItem("quiz", this)

            
            let index = 0
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
        return ans; 
    }

    getQuestions(){
        return this.questions
    }
    
    displayQuestion(index){
        let currq = this.questions[index]
        if(currq != null){
            this.updatebar(index, this.questions.length)
            localStorage.setItem("factor", currq.getFactor())
            let numEl = document.querySelector('#qnum')
            numEl.innerHTML = `${currq.getText()}`
            let answers = currq.getAnswers()
            
            let htmlAnsList = document.getElementById("anslist")
            htmlAnsList.innerHTML = ""
            for(let j = 0; j < answers.length; j++){
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
    
            let currans = document.createElement("choice-bubble")
            currans.innerHTML = `<input type="radio" id="answer0">
            <label for="answer0">Answer 0</label>`
            let answers = document.getElementById("anslist")
            answers.appendChild(currans)
        }
        
    
        
    }
    
    nextquestion(){
        let index = localStorage.getItem("index")
        index = Number(index) + 1
        
        this.incrementFactors(localStorage.getItem("selectedfactor"), localStorage.getItem("selectedweight"))
        
        
        if(index >= this.questions.length){
            this.luciResults()
            window.location.href = "resultspage.html";
        }else{
            this.displayQuestion(index)
            localStorage.setItem("index", index)
        }
    }
    
    updatebar(index, numq){
        let percent = (index / numq) * 100
        document.getElementById('bar').style.width = percent+"%"
        
    }
    
    incrementFactors(factor, weight){
        let og = Number(localStorage.getItem(factor))
        if(og != null){
            let newfact = Number(og) + Number(weight)
            localStorage.setItem(factor, newfact)
        }else{
            console.log("ohno")
        }
    }
    
    luciResults(){
        let result = []
        let intExt = localStorage.getItem("IE")
        let sensInt = localStorage.getItem("SN")
        let thinkFeel = localStorage.getItem("TF")
        let judgePros = localStorage.getItem("JP")

        if(intExt < 0){
            result[0] = "I"
        }else if( intExt > 0){
            result[0] = "E"
        }else{
            result[0] = "?"
        }
        
        if(sensInt < 0){
            result[1] = "S"
        }else if(sensInt > 0){
            result[1] = "N"
        }else{
            result[1] = "?"
        }

        if(thinkFeel < 0){
            result[2] = "T"
        }else if(thinkFeel > 0){
            result[2] = "F"
        }else{
            result[2] = "?"
        }

        if(judgePros < 0){
            result[3] = "J"
        }else if(judgePros > 0){
            result[3] = "P"
        }else{
            result[3] = "?"
        }
    
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
        
        let finalRes = new completedResult(getCurrentDate(), localStorage.getItem("resultname"), localStorage.getItem("resultinfo"))
        this.saveResult(finalRes)
    
    }

    async saveResult(result) {

        const newResult = {date: result.getdate(), resultname: result.getresultname(), resultinfo: result.getresultinfo()};
        
        try {
          const response = await fetch('/api/result', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newResult),
          });
    
          // Store what the service gave us as the results
          const serviceresults = await response.json();
          localStorage.setItem("results", serviceresults);
        } catch(error) {
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
    resetFactors()
    localStorage.setItem("questions", '{"name":"q0", "text":"oh no there isnt any text", "factor":"???"}')

    quiz = new Quiz()
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
    localStorage.setItem("selectedfactor", factor)
    localStorage.setItem("selectedweight", weight)
}

onload()

