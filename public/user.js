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
}



function insertUserResults(){
    let username = localStorage.getItem("username")
    let sampleres = new completedResult("9/21/2024", "INTJ", "information!!")
    let results = [sampleres]

    /*if(resultsText != null) {
        results = JSON.parse(resultsText);
    }*/

    //console.log(user.getusername)
    //console.log(user.getresults)
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

function insertUsername(){
    let usernameEl = document.createElement("p")
    let currentuser = localStorage.getItem("username")
    console.log(currentuser)
    usernameEl.innerHTML = `Username: ${currentuser}`
    let info = document.getElementById("userinfo")
    info.appendChild(usernameEl)
}

function buttonClicked(name, info){
    console.log("button clicked! setting result info")
    localStorage.setItem("resultname", name)
    localStorage.setItem("resultinfo", info)
    window.location.href = "resultspage.html";
}

insertUsername()
insertUserResults()