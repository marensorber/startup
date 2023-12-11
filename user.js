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



function insertUserResults(){
    let username = localStorage.getItem("username")
    const resultsText = localStorage.getItem("usersresults")
    const results = null

    if(resultsText != null) {
        results = JSON.parse(resultsText);
    }

    //console.log(user.getusername)
    //console.log(user.getresults)
    if(username === null){
        let res = document.createElement("li")
        res.innerHTML = `No Results For User`
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
            res.innerHTML = `No Results For User`
            let results = document.getElementById("results")
            results.appendChild(res)
        }
        
    }
    
    
}

function insertUsername(){
    let usernameEl = document.createElement("p")
    let currentuser = localStorage.getItem("username")
    console.log(currentuser)
    usernameEl.innerHTML = `Username: ${currentuser}`
    let info = document.getElementById("userinfo")
    info.appendChild(usernameEl)
}

insertUsername()
insertUserResults()