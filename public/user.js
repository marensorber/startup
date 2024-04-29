

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


class User{
    results = []
    username = "no Username"

    setUsername(name){
        this.username = name
    }

    async loadUserResults(){
        console.log("load checkpoint 1")
        //load results
        try{
            console.log("load checkpoint 2")
            //get the results from the service 
            const response = await fetch('api/results');
            let tempresults = await response.json();

            console.log("load checkpoint 3")
            console.log(`temp results from the request = ${tempresults}`)


            let rnum = Number(tempresults.rnum);
            console.log(`the number of responses = ${tempresults.rnum}`)


            for(let i = 0; i < rnum; i++){
                let index = Number(i) + Number(1)
                this.results[i] = new completedResult(JSON.stringify(tempresults["r" + index.toString()].date).replaceAll("\"", ""), JSON.stringify(tempresults["r" + index.toString()].resultname).replaceAll("\"", ""), JSON.stringify(tempresults["r" + index.toString()].resultinfo).replaceAll("\"", ""))
                console.log(`for index ${index}, the result is: ${this.results[i]} `)
            }
            for(let i = 0; i < rnum; i++){
                console.log(`current r = ${this.results[i]}`)
            }

            insertUsername(this.username)
            insertUserResults(this.username, this.results)
        } catch{
            // If there was an error
            console.log("ERROR")
        
        }

    }
}



function insertUserResults(username, results){
    //let username = localStorage.getItem("username")
    //let sampleres = new completedResult("9/21/2024", "INTJ", "information!!")
    //let results = [sampleres]

    /*if(resultsText != null) {
        results = JSON.parse(resultsText);
    }*/

    //console.log(user.getusername)
    //console.log(user.getresults)
    if(username === null){
        console.log("NULL username!")
        let res = document.createElement("li")
        res.innerHTML = `No Results For User`
        htmlresults = document.getElementById("results")
        htmlresults.appendChild(res)
    }else{
        if(results != null){
            console.log("CHECKPOINT 1")
            console.log(`results = ${results}`)
            for(i = 0; i < results.length; i++){
                console.log("CHECKPOINT 2")
                currresult = results[i]
                let res = document.createElement("li")
                res.innerHTML = `<a onClick="buttonClicked('${currresult.getresultname()}', '${currresult.getresultinfo()}')">${currresult.getdate()}</a>`
                htmlResults = document.getElementById("results")
                htmlResults.appendChild(res)
            }
        }else{
            console.log("NULL REsults! ")
            let res = document.createElement("li")
            res.innerHTML = `No Results For User`
            htmlResults = document.getElementById("results")
            htmlResults.appendChild(res)
        }
        
    }
    
    
}

function insertUsername(username){
    let usernameEl = document.createElement("p")
    //let currentuser = localStorage.getItem("username")
    //console.log(currentuser)
    usernameEl.innerHTML = `Username: ${username}`
    let info = document.getElementById("userinfo")
    info.appendChild(usernameEl)
}

function buttonClicked(name, info){
    console.log("button clicked! setting result info")
    localStorage.setItem("resultname", name)
    localStorage.setItem("resultinfo", info)
    window.location.href = "resultspage.html";
}

let currUser = new User()
currUser.setUsername(localStorage.getItem("username"))
currUser.loadUserResults()