//These will be loaded from the database eventually
const intjinfo = "here's the INTJ info"
const istjinfo = "here's the ISTJ info"
const isfjinfo = "here's the ISFJ info"
const isfpinfo = "here's the ISFP info"
const istpinfo = "here's the ISTP info"
const intpinfo = "here's the INTP info"
const infpinfo = "here's the INFP info"
const infjinfo = "here's the INFJ info"
const entjinfo = "here's the ENTJ info"
const enfjinfo = "here's the ENFJ info"
const entpinfo = "here's the ENTP info"
const estjinfo = "here's the ESTJ info"
const esfjinfo = "here's the ESFJ info"
const estpinfo = "here's the ESTP info"
const enfpinfo = "here's the ENFP info"
const esfpinfo = "here's the ESFP info"

function onload(){
    resetFactors()
    let quiz = localStorage.getItem("quizname")
    //localStorage.setItem("Luciquestions", )
    if(quiz != null){
        let questionsText = localStorage.getItem(quiz + "questions")

    const questions = null

    if(questionsText != null) {
        questions = JSON.parse(questionsText);
    }
    if(questions != null){
        let index = 0
        displayQuestion(index)
        localStorage.setItem("index", index)
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

function buttonClicked(factor, weight){
    localStorage.setItem("selectedfactor", factor)
    localStorage.setItem("selectedweight", weight)
}


function displayQuestion(index, questions){
    let currq = questions[i]
            //name
            //text
            //answers
            //factor
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
}

function updatebar(index, numq){
    let percent = (index / numq) * 100
    document.getElementById('bar').style.width = percent+"%"
    
}

function calculateResults(quizname){
    switch (quizname){
        case "Luci":
            luciResults();
    }
    
}

function resetFactors(){
    localStorage.setItem("IE", 0)
    localStorage.setItem("SN", 0)
    localStorage.setItem("TF", 0)
    localStorage.setItem("JP", 0)
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

    if(intExt > 0){
        result[0] = "I"
    }else if( intExt < 0){
        result[0] = "E"
    }else{
        result[0] = "?"
    }

    if(sensInt > 0){
        result[1] = "S"
    }else if(sensInt < 0){
        result[1] = "N"
    }else{
        result[1] = "?"
    }

    if(thinkFeel > 0){
        result[2] = "T"
    }else if(thinkFeel < 0){
        result[2] = "F"
    }else{
        result[2] = "?"
    }

    if(judgePros > 0){
        result[3] = "J"
    }else if(judgePros < 0){
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

function nextquestion(){
    let quiz = localStorage.getItem("quizname")
    if(quiz != null){
        let questionsText = localStorage.getItem(quiz + "questions")

        const questions = null

        if(questionsText != null) {
            questions = JSON.parse(questionsText);
        }
        if(questions != null){
            incrementFactors(localStorage.getItem("selectedfactor"), localStorage.getItem("selectedweight"))
            let index = localStorage.getItem("index")
            index = index + 1
            updatebar(index, questions.length)
            if(index > questions.length + 1){
                calculateResults(quiz)
                window.location.href = "resultspage.html";
            }else{
                
                displayQuestion(index)
                localStorage.setItem("index", index)
            }
            
        }

    }else{
        window.location.href = "resultspage.html";
    }
}

onload()
/*<div class="choice-bubble">
            <input type="radio" id="ans1">
            <label for="ans1">Answer 1</label>
        </div>
        <div class="choice-bubble">
            <input type="radio" id="ans2">
            <label for="ans2">Answer 2</label>
        </div>
        <div class="choice-bubble">
            <input type="radio" id="ans3">
            <label for="ans3">Answer 3</label>
        </div>
        <div class="choice-bubble">
            <input type="radio" id="ans4">
            <label for="ans4">Answer 4</label>
        </div>*/