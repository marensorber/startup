/*
FACTORS 
**most neg to most positive!
IE = if negative that means introverted
SN
TF
JP
 */

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
            console.log(`temp questions = ${JSON.stringify(tempquestions)}`)
            console.log("CHECKPOINT 4")
            this.questions[0] = JSON.stringify(tempquestions.qs.q1)
            this.questions[1] = JSON.stringify(tempquestions.qs.q2)
            this.questions[2] = JSON.stringify(tempquestions.qs.q3)
            this.questions[3] = JSON.stringify(tempquestions.qs.q4)
            this.questions[4] = JSON.stringify(tempquestions.qs.q5)
            for(let i = 0; i < qnum; i++){
                console.log(`current q = ${this.questions[i]}`)
            }
            /*
            let ids = []

            for(let i = 0; i < qnum; i++){
                console.log("CHECKPOINT 5")
                let curr = "qs.q" + (i+1).toString();
                console.log(curr);
                ids[i] = curr
            }
            for(let i = 0; i < qnum; i++){
                console.log("CHECKPOINT ????")
                this.questions[i] = JSON.stringify(tempquestions.ids[i])
                console.log(`current q = ${this.questions[i]}`)
            }*/

            

            console.log("CHECKPOINT 6")
            console.log(`Here is the response = ${this.questions}`);
            //save the questions
            localStorage.setItem("questions", this.questions);
            console.log("CHECKPOINT 7")
            console.log(`local storage questions = ${localStorage.getItem("questions")}`)
            
            console.log("CHECKPOINT 8")
            //console.log(`local storage questions = ${localStorage.getItem("questions")}`)
            localStorage.setItem("quiz", this)

            let index = 0
            console.log("displaying the question!")
            localStorage.setItem("index", index)
            displayQuestion(index)
        } catch{
            // If there was an error then just use the last saved questions
            console.log("ERROR")
            const oldQuestions = localStorage.getItem('questions');
            if (oldQuestions) {
                this.questions = JSON.parse(oldQuestions);
            }
        }

    }

    getQuestions(){
        return this.questions
    }

}

function onload(){
    console.log("Beginning to load active quiz 2!")
    resetFactors()
    //let quiz = localStorage.getItem("quizname")
    localStorage.setItem("questions", '{"name":"q0", "text":"oh no there isnt any text", "factor":"???"}')

    let quiz = new Quiz()
    console.log("Loading questions!")
    quiz.loadQuestions()
    
    
    

}

function resetFactors(){
    localStorage.setItem("IE", 0)
    localStorage.setItem("SN", 0)
    localStorage.setItem("TF", 0)
    localStorage.setItem("JP", 0)
}

function buttonClicked(factor, weight){
    localStorage.setItem("selectedfactor", factor)
    localStorage.setItem("selectedweight", weight)
}

function displayQuestion(index){
    console.log("DISPLAY CHECKPOINT 0")
    let qs = localStorage.getItem("questions")
    let currq = qs[index]
    console.log("DISPLAY CHECKPOINT 1")
    console.log(`currq = ${currq}`)
    if(currq != null){
        let numEl = document.querySelector('#qnum')
        numEl.innerHTML = `Question ${index + 1}`
        let textEl = document.querySelector('#qtext')
        textEl = currq.text

        for(j = 0; j < currq.answers.length; j++){
            let answer = currq.answers[j]
            let currans = document.createElement("choice-bubble")
            currans.innerHTML = `<input type="radio" id="${"ans"+j}" onclick="buttonClicked(${currans.factor}, ${currans.weight})">
            <label for="${"ans"+j}">${answer.text}</label>`
            let text = document.getElementById("qtext")
            text.appendChild(currans)
        }
    }else{
        let numEl = document.querySelector('#qnum')
        numEl.innerHTML = `Question 0`
        let textEl = document.querySelector('#qtext')
        textEl = 'NULL TEXT'

        let currans = document.createElement("choice-bubble")
        currans.innerHTML = `<input type="radio" id="answer0">
        <label for="answer0">Answer 0</label>`
        let answers = document.getElementById("anslist")
        answers.appendChild(currans)
    }
    

    
}

function nextquestion(){
    let index = localStorage.getItem("index")
    index = index + 1
    let quiz = localStorage.getItem("quiz")
    let questions = localStorage.getItem("questions")

    incrementFactors(localStorage.getItem("selectedfactor"), localStorage.getItem("selectedweight"))
    updatebar(index, questions.length)

    if(index > questions.length + 1){
        luciResults()
        window.location.href = "resultspage.html";
    }else{
        displayQuestion(quiz, index)
        localStorage.setItem("index", index)
    }
}

function updatebar(index, numq){
    let percent = (index / numq) * 100
    document.getElementById('bar').style.width = percent+"%"
    
}

function incrementFactors(factor, weight){
    let og = localStorage.getItem(factor)
    if(og != null){
        let newfact = og + weight
        localStorage.setItem(factor, newfact)
    }else{
        console.log("ohno")
    }
}

function luciResults(){
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

    switch (result.toString){
        case "I,N,T,J":
            localStorage.setItem(resultname, "INTJ")
            localStorage.setItem(resultinfo, intjinfo)
            break
        case "I,S,T,J":
            localStorage.setItem(resultname, "ISTJ")
            localStorage.setItem(resultinfo, istjinfo)
            break  
        case "I,N,F,J":
            localStorage.setItem(resultname, "INFJ")
            localStorage.setItem(resultinfo, infjinfo)
            break
        case "I,N,T,P":
            localStorage.setItem(resultname, "INTP")
            localStorage.setItem(resultinfo, intpinfo)
            break  
        case "I,S,F,P":
            localStorage.setItem(resultname, "ISFP")
            localStorage.setItem(resultinfo, isfpinfo)
            break  
        case "I,S,F,J":
            localStorage.setItem(resultname, "ISFJ")
            localStorage.setItem(resultinfo, isfjinfo)
            break
        case "I,S,T,P":
            localStorage.setItem(resultname, "ISTP")
            localStorage.setItem(resultinfo, istpinfo)
            break  
        case "I,N,F,P":
            localStorage.setItem(resultname, "INFP")
            localStorage.setItem(resultinfo, infpinfo)
            break  
        case "E,N,T,J":
            localStorage.setItem(resultname, "ENTJ")
            localStorage.setItem(resultinfo, entjinfo)
            break
        case "E,S,T,J":
            localStorage.setItem(resultname, "ESTJ")
            localStorage.setItem(resultinfo, estjinfo)
            break  
        case "E,N,F,J":
            localStorage.setItem(resultname, "ENFJ")
            localStorage.setItem(resultinfo, enfjinfo)
            break
        case "E,N,T,P":
            localStorage.setItem(resultname, "ENTP")
            localStorage.setItem(resultinfo, entpinfo)
            break  
        case "E,S,F,P":
            localStorage.setItem(resultname, "ESFP")
            localStorage.setItem(resultinfo, esfpinfo)
            break  
        case "E,S,F,J":
            localStorage.setItem(resultname, "ESFJ")
            localStorage.setItem(resultinfo, esfjinfo)
            break
        case "E,S,T,P":
            localStorage.setItem(resultname, "ESTP")
            localStorage.setItem(resultinfo, estpinfo)
            break  
        case "E,N,F,P": 
            localStorage.setItem(resultname, "ENFP")
            localStorage.setItem(resultinfo, enfpinfo)
            break 
    }

}



onload()

