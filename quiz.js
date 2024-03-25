function insertQuizResults(){
    let quiz = localStorage.getItem("quizname")

    const resultsText = localStorage.getItem(quiz + "results")
    const results = null

    if(resultsText != null) {
        results = JSON.parse(resultsText);
    }

    if(quiz === null){
        let res = document.createElement("li")
        res.innerHTML = `No Results For Quiz`
        let results = document.getElementById("results")
        results.appendChild(res)
    }else{
        if(results != null){
            for(i = 0; i < results.length; i++){
                currresult = results[i]
                let res = document.createElement("li")
                res.innerHTML = `<a href="resultspage.html">${currresult.date}</a>`
                let results = document.getElementById("results")
                results.appendChild(res)
            }
        }else{
            let res = document.createElement("li")
            res.innerHTML = `No Results For Quiz`
            let results = document.getElementById("results")
            results.appendChild(res)
        }
        
    }
    
    
}

function insertquizname(){
    let nameEl = document.querySelector('#quizname')
    let quiz = localStorage.getItem("quizname")
    nameEl.innerHTML = `${quiz}`
    let infoEl = document.querySelector("#info")
    let quizinfo = localStorage.getItem(quiz + "info")
    infoEl.innerHTML = `${quizinfo}`
}

insertquizname()
insertQuizResults()