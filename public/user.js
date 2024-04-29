

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
        //load results
        try{
            //get the results from the service 
            const response = await fetch('api/results');
            let tempresults = await response.json();

            let rnum = Number(tempresults.rnum);

            for(let i = 0; i < rnum; i++){
                let index = Number(i) + Number(1)
                this.results[i] = new completedResult(JSON.stringify(tempresults["r" + index.toString()].date).replaceAll("\"", ""), JSON.stringify(tempresults["r" + index.toString()].resultname).replaceAll("\"", ""), JSON.stringify(tempresults["r" + index.toString()].resultinfo).replaceAll("\"", ""))
                
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
    
    if(username === null){
        let res = document.createElement("li")
        res.innerHTML = `No Results For User`
        htmlresults = document.getElementById("results")
        htmlresults.appendChild(res)
    }else{
        if(results != null){
            for(i = 0; i < results.length; i++){
                currresult = results[i]
                let res = document.createElement("li")
                res.innerHTML = `<a onClick="buttonClicked('${currresult.getresultname()}', '${currresult.getresultinfo()}')">${currresult.getdate()}</a>`
                htmlResults = document.getElementById("results")
                htmlResults.appendChild(res)
            }
        }else{
            let res = document.createElement("li")
            res.innerHTML = `No Results For User`
            htmlResults = document.getElementById("results")
            htmlResults.appendChild(res)
        }
        
    }
    
    
}

function insertUsername(username){
    let usernameEl = document.createElement("p")
    usernameEl.innerHTML = `Username: ${username}`
    let info = document.getElementById("userinfo")
    info.appendChild(usernameEl)
}

function buttonClicked(name, info){
    localStorage.setItem("resultname", name)
    localStorage.setItem("resultinfo", info)
    window.location.href = "resultspage.html";
}

let currUser = new User()
currUser.setUsername(localStorage.getItem("username"))
currUser.loadUserResults()